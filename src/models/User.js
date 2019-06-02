import moment from 'moment';
import uuid from 'uuid';
import bcrypt from 'bcrypt';

class User {
  constructor() {
    this.users = [];
  }

  // Add user
  async add(data) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password, salt);
    const user = {
      id: uuid.v4(),
      email: data.email || '',
      first_name: data.first_name || '',
      last_name: data.last_name || '',
      password: hash || '',
      address: data.address || '',
      is_admin: data.is_admin || false,
      createdDate: moment.now(),
      modifiedDate: moment.now(),
    };
    this.users.push(user);
    return user;
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
