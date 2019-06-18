import pool from '../database/migrations/createUserTableSchema';

export default {
  query(queryString, params) {
    return new Promise((resolve, reject) => {
      pool.query(queryString, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
