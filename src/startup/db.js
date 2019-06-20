import { Pool } from 'pg';
import config from 'config';
import winston from 'winston';

const db = config.get('dbUrl');
console.log(process.env.NODE_ENV);
const pool = new Pool({
  connectionString: db,
});

pool.on('connect', () => {
  winston.info(`connected to ${db}`);
});

pool.on('remove', () => {
  winston.info('db closed');
});

export default pool;
