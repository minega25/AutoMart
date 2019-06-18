import pool from '../../startup/db';

const Createtables = () => {
  const Users = `CREATE TABLE IF NOT EXISTS
    users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(30) UNIQUE NOT NULL,
        first_name VARCHAR(20) NOT NULL,
        last_name VARCHAR(20) NOT NULL,
        password VARCHAR(300) NOT NULL ,
        address VARCHAR(20) NOT NULL,
        user_type VARCHAR(20) NOT NULL,
        is_admin VARCHAR(10) NOT NULL
    )`;

  const Queries = `${Users};`;
  pool.query(Queries).then((res) => {
    console.log(res);
    pool.end();
  })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const Droptables = () => {
  const Users = 'DROP TABLE IF EXISTS users CASCADE';
  const Queries = `${Users};`;
  pool.query(Queries)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
  pool.on('remove', () => {
    console.log(`client removed ${Queries}`);
    process.exit(0);
  });
};
Createtables();
