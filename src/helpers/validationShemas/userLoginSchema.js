import Joi from '@hapi/joi';

const schema = {
  email: Joi.string().email().min(5).max(255)
    .required(),
  password: Joi.string().min(5).max(255).required(),
};

export default schema;
