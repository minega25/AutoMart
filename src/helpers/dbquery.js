import pool from '../startup/db';

const q = (queryString, params) => new Promise((resolve, reject) => {
  pool.query(queryString, params)
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
});
export default q;
