import express, { type Request, type Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { sequelize } from './lib/db';

import { initUser } from './modules/user/user.model';
import { initDrop } from './modules/drops/drops.model';

initDrop(sequelize);
initUser(sequelize);

const PORT = process.env.PORT ?? 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'sneaker-drops-api up and running' });
});

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connected and models synced');

    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();

