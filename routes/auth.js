const _ = require('lodash');
const Joi = require('@hapi/joi');
const express = require('express');
const User = require('../models/User');

const router = express.Router();
const user = new User();

function validate(req) {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).min(5).max(255)
      .required(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(req, schema);
}

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send('Invalid credentials.');

  if (!user.findOne(req.body.email)) {
    return res.status(400).send('Invalid email or password');
  }

  const newUser = _.pick(req.body, ['email', 'first_name', 'last_name', 'password', 'address']);
  const userInstance = await user.add(newUser);
  return res.send(_.pick(userInstance, ['first_name', 'email']));
});

module.exports = router;
