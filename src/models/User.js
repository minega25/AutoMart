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
    // Create query string
    const queryString = `INSERT INTO 
      users(id, email, first_name, last_name, 
        password, address, is_admin, createdDate, modifiedDate)
        VALUES($1, $2, $3, $4, $5, $6)
        returning *`;
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
      createdDate: moment.now(),
      modifiedDate: moment.now(),
    };
    const { rows } = await Query.query(queryString, user);
    const regUser = rows[0];
    this.users.push(regUser);
    return regUser;
  }

  // Find user by Id
  findById(id) {
    return this.users.find(user => user.id === id);
  }

  // Find user by any attribute
  findOne(data) {
    const attrArr = Object.keys(data);
    const attr = attrArr[0];

    return this.users.find(user => user[attr] === data[attr]);
  }

  // Find all users
  findAll() {
    return this.users;
  }

  // Update a user
  async update(id, data) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password, salt);
    const user = this.findById(id);
    const index = this.users.indexOf(user);
    this.users[index].password = hash || user.password;
    this.users[index].modifiedDate = moment.now();

    return this.users;
  }

  // Delete user by id
  delete(id) {
    const user = this.findById(id);
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);

    return this.users;
  }
}

export default User;
