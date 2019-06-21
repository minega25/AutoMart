import winston from 'winston';
import pool from '../../startup/db';

const droptables = () => {
  const Users = 'DROP TABLE IF EXISTS users CASCADE';
  const Cars = 'DROP TABLE IF EXISTS cars CASCADE';
  const Orders = 'DROP TABLE IF EXISTS orders CASCADE';
  const Flags = 'DROP TABLE IF EXISTS flags CASCADE';
  pool.query(`${Users};${Cars};${Orders};${Flags}`).then((res) => {
    winston.info(res);
    pool.end();
  })
    .catch((err) => {
      winston.info(err);
      pool.end();
    });
};
require('make-runnable');

export default droptables();
