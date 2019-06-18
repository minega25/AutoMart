import { Pool } from 'pg';
import config from 'config';
import winston from 'winston';

const pool = new Pool({
  connectionString: config.get('dbUrl'),
});

pool.on('connect', () => {
  winston.info('connected to the db');
});

pool.on('remove', () => {
  winston.info('db closed');
});

export default pool;
