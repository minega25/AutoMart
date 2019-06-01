const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const User = require('../models/User');
const userSchema = require('../helpers/validationShemas/userSchema');

const users = new User();
// Handle user create on POST.
exports.user_create_post = async (req, res) => {
  const newUser = _.pick(req.body, ['first_name', 'last_name', 'password', 'email', 'address']);
  const { error } = Joi.validate(newUser, userSchema);
  if (error) {
    const response = {
      status: 400,
      error: error.details[0].message,
    };
    return res.status(400).json(response);
  }

  const userExistsAlready = users.findAll()
    .find(user => user.email === newUser.email);

  if (userExistsAlready) {
    const response = {
      status: 400,
      error: 'User already exists',
    };
    return res.status(400).json(response);
  }
  const addedUser = await users.add(newUser);

  const userToken = jwt.sign({ id: addedUser.id }, config.get('jwtPrivateKey'));
  const response = {
    status: 200,
    data: {
      token: userToken,
      id: addedUser.id,
      first_name: addedUser.first_name,
      last_name: addedUser.last_name,
      email: addedUser.email,
    },
  };
  return res.header('x-auth-token', userToken).status(200).json(response);
};
