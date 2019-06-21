import jwt from 'jsonwebtoken';
import config from 'config';
import bcrypt from 'bcrypt';
import User from '../models/User';

const users = new User();

// Handle user create on POST.
export const userCreatePost = async (req, res) => {
  try {
    const addedUser = await users.add(req.newUser);

    const userToken = jwt.sign({ id: addedUser.id, email: addedUser.email, isAdmin: addedUser.is_admin }, config.get('jwtPrivateKey'));
    const response = {
      status: 201,
      message: 'User created successfully',
      data: {
        token: userToken,
        id: addedUser.id,
        first_name: addedUser.first_name,
        last_name: addedUser.last_name,
        email: addedUser.email,
        address: addedUser.address,
        is_admin: addedUser.is_admin,
      },
    };
    return res.header('x-auth-token', userToken).status(201).json(response);
  } catch (err) {
    const response = {
      status: 409,
      error: 'User already registered',
    };
    return res.status(409).json(response);
  }
};

export const userLoginPost = async (req, res) => {
  const userRegistered = await users.findByEmail(req.user.email);
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
    message: 'user logged in successfully',
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
