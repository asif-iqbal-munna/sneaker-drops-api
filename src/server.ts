import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { sequelize } from './core/db';
import { sendError, sendSuccess } from './lib/apiResponse';
import compression from 'compression';
import rateLimit from "express-rate-limit";
import { initModels } from './lib/initModels';
import routes from './routes';
import "./modules/drops/drop.worker"
import { errorHandler } from './middleware/errorHandler';
import { dropsQueue } from './modules/drops/drops.queue';
import { initSocket } from './lib/socket';
import 'pg'; 

const PORT = process.env.PORT ?? 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/v1", limiter, routes);

app.get('/api/health', (_req: Request, res: Response) => {
  return sendSuccess(res, { status: 'ok' }, 'Health check successful');
});

app.use((_req: Request, res: Response) => {
  return sendError(res, { message: 'Route not found' }, 'Route not found');
});

app.use(errorHandler);

async function start() {
  try {
    initModels(sequelize);
    await sequelize.authenticate();

    const server = app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });

    initSocket(server);
    
    const delayed = await dropsQueue.getJobs([
      "delayed",
    ]);
    const waiting = await dropsQueue.getJobs([
      "waiting",
    ]);
    const active = await dropsQueue.getJobs([
      "active",
    ]);
    
    console.log("delayed",delayed.map(j => ({
      id: j.id,
      name: j.name,
      delay: j.opts.delay,
      timestamp: j.timestamp,
    })));
    console.log("waiting",waiting.map(j => ({
      id: j.id,
      name: j.name,
      delay: j.opts.delay,
      timestamp: j.timestamp,
    })));
    console.log("active",active.map(j => ({
      id: j.id,
      name: j.name,
      delay: j.opts.delay,
      timestamp: j.timestamp,
    })));
    const shutdown = async (signal: string) => {
      console.log(`Received ${signal}`);

      server.close(async (closeErr) => {
        if (closeErr) {
          console.error('Error closing HTTP server', closeErr);
        }

        try {
          await sequelize.close();
          console.log('Database connection closed');
        } catch (dbErr) {
          console.error('Error closing database connection', dbErr);
        } finally {
          process.exit(closeErr ? 1 : 0);
        }
      });
    };

    process.on('SIGINT', () => void shutdown('SIGINT'));
    process.on('SIGTERM', () => void shutdown('SIGTERM'));

    process.on('unhandledRejection', (reason) => {
      console.error('Unhandled promise rejection:', reason);
    });

    process.on('uncaughtException', (error) => {
      console.error('Uncaught exception:', error);
    });
  } catch (err) {
    console.error('Failed to start server', err);
  }
}

start();

