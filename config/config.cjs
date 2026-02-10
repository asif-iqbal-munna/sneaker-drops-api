require('dotenv').config();

const common = {
  dialect: 'postgres',
  host: process.env.PGHOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 5432),
};

module.exports = {
  development: {
    username: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    database: process.env.PGDATABASE || 'sneaker_drops_dev',
    ...common,
  },
  test: {
    username: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    database: process.env.PGDATABASE || 'sneaker_drops_test',
    ...common,
  },
  production: {
    username: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    database: process.env.PGDATABASE || 'sneaker_drops_prod',
    ...common,
  },
};

