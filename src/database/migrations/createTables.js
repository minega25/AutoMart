import winston from 'winston';
import pool from '../../startup/db';

const Createtables = () => {
  const Users = `CREATE TABLE IF NOT EXISTS 
                users( id UUID PRIMARY KEY, 
                    email VARCHAR(30) UNIQUE NOT NULL, 
                    first_name VARCHAR(20) NOT NULL, 
                    last_name VARCHAR(20) NOT NULL, 
                    password VARCHAR(300) NOT NULL , 
                    address VARCHAR(20) NOT NULL, 
                    is_admin VARCHAR(10) NOT NULL,
                    createdDate TIMESTAMP,
                    modifiedDate TIMESTAMP )`;
  const Cars = `CREATE TABLE IF NOT EXISTS cars
                    (
                    id UUID PRIMARY KEY,
                    owner UUID NOT NULL,
                    email VARCHAR(30) NOT NULL,
                    state VARCHAR(30) NOT NULL,
                    status VARCHAR(30) NOT NULL,
                    price INT NOT NULL,
                    manufacturer VARCHAR(30) NOT NULL,
                    model VARCHAR(30) NOT NULL,
                    body_type VARCHAR(30) NOT NULL,
                    createdDate TIMESTAMP,
                    modifiedDate TIMESTAMP,
                    FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE
                    )`;
  const Orders = `CREATE TABLE IF NOT EXISTS orders
                    (
                    id UUID PRIMARY KEY,
                    buyer UUID NOT NULL,
                    car_id UUID,
                    price DECIMAL(12,2) NOT NULL,
                    price_offered INT NOT NULL,
                    status VARCHAR(30) NOT NULL,
                    createdDate TIMESTAMP,
                    modifiedDate TIMESTAMP,
                    FOREIGN KEY (buyer) REFERENCES users(id) ON DELETE CASCADE
                    )`;
  const Flags = `CREATE TABLE IF NOT EXISTS flags
                    (
                    id UUID PRIMARY KEY,
                    car_id UUID,
                    reason VARCHAR(256) NOT NULL,
                    description VARCHAR(256) NOT NULL,
                    createdDate TIMESTAMP,
                    modifiedDate TIMESTAMP,
                    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
                    )`;
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

export default Createtables();
