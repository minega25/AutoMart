const _ = require('lodash');
const express = require('express');
const User = require('../models/User');

const router = express.Router();
const user = new User();

router.post('/', async (req, res) => {
  if (user.findOne(req.body.email)) {
    return res.status(400).send('User already registered');
  }
  const newUser = _.pick(req.body, ['email', 'first_name', 'last_name', 'password', 'address']);
  const userInstance = await user.add(newUser);
  return res.send(_.pick(userInstance, ['first_name', 'email']));
});

module.exports = router;
