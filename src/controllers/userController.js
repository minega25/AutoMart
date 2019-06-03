import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import config from 'config';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import User from '../models/User';
import userSignUpSchema from '../helpers/validationShemas/userSignUpSchema';
import userLoginSchema from '../helpers/validationShemas/userLoginSchema';

const users = new User();

// Handle user create on POST.
export const userCreatePost = async (req, res) => {
  const newUser = _.pick(req.body, ['first_name', 'last_name', 'password', 'email', 'address', 'is_admin']);
  const { error } = Joi.validate(newUser, userSignUpSchema);
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

  const userToken = jwt.sign({ id: addedUser.id, email: addedUser.email, isAdmin: addedUser.is_admin }, config.get('jwtPrivateKey'));
  const response = {
    status: 200,
    data: {
      token: userToken,
      id: addedUser.id,
      first_name: addedUser.first_name,
      last_name: addedUser.last_name,
      email: addedUser.email,
      is_admin: addedUser.is_admin,
    },
  };
  return res.header('x-auth-token', userToken).status(200).json(response);
};

export const userLoginPost = async (req, res) => {
  const user = _.pick(req.body, ['email', 'password']);
  const { error } = Joi.validate(user, userLoginSchema);
  if (error) {
    const response = {
      status: 400,
      error: error.details[0].message,
    };
    return res.status(400).json(response);
  }

  const userRegistered = users.findAll()
    .find(u => u.email === user.email);
  if (!userRegistered) {
    const response = {
      status: 400,
      error: 'Invalid email or password provided',
    };
    return res.status(400).json(response);
  }

  const validPassword = await bcrypt.compare(req.body.password, userRegistered.password);
  if (!validPassword) {
    const response = {
      status: 400,
      error: 'Invalid email or password provided',
    };
    return res.status(400).json(response);
  }
  const userToken = jwt.sign({ id: userRegistered.id, email: userRegistered.email, isAdmin: userRegistered.is_admin }, config.get('jwtPrivateKey'));
  const response = {
    status: 200,
    data: {
      token: userToken,
      id: userRegistered.id,
      first_name: userRegistered.first_name,
      last_name: userRegistered.last_name,
      email: userRegistered.email,
    },
  };
  return res.header('x-auth-token', userToken).status(200).json(response);
};
