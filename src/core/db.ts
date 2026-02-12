import { Sequelize } from 'sequelize';
import pg from 'pg';

const DB_NAME = process.env.PGDATABASE ?? 'sneaker_drops';
const DB_USER = process.env.PGUSER ?? 'postgres';
const DB_PASSWORD = process.env.PGPASSWORD ?? 'postgres';
const DB_HOST = process.env.PGHOST ?? 'localhost';
const DB_PORT = Number(process.env.DB_PORT ?? 5432);

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  dialectModule: pg,
  logging: false,
  pool: {
    min: 1,
    max: 3,
    idle: 10000,
    acquire: 80000
  }
});

