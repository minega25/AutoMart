/* eslint-disable class-methods-use-this */
import moment from 'moment';
import uuid from 'uuid';
import bcrypt from 'bcrypt';
import Query from '../helpers/dbquery';

class User {
  constructor() {
    this.users = [];
  }

  // Add user
  async add(data) {
    // Query string
    const insertUser = `INSERT INTO users(id,email,first_name,last_name,password,address,is_admin,createddate,modifieddate) 
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *`;

    // Hash user password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password, salt);
    const user = {
      id: uuid.v4(),
      email: data.email || '',
      first_name: data.first_name || '',
      last_name: data.last_name || '',
      password: hash || '',
      address: data.address || '',
      is_admin: !!data.is_admin,
      createdDate: moment().format(),
      modifiedDate: moment().format(),
    };
    const userArr = Object.keys(user).map(u => user[u]);
    const { rows } = await Query(insertUser, userArr);
    this.users.push(user);
    return rows[0];
  }

  // Find user by Id
  async findById(id) {
    const query = 'SELECT * FROM users WHERE id=$1';
    const { rows } = await Query(query, [id]);
    return rows[0];
  }

  async findByEmail(email) {
    const text = 'SELECT * FROM users WHERE email=$1';
    const { rows } = await Query(text, [email]);
    return rows[0];
  }

  // Find all users
  async findAll() {
    const text = 'SELECT * FROM users';
    const { rows } = await Query(text, []);
    return rows;
  }
}

export default User;
