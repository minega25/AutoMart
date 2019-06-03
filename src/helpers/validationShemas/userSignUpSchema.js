import Joi from '@hapi/joi';

const schema = {
  first_name: Joi.string().min(5).max(255).required(),
  last_name: Joi.string().min(5).max(255).required(),
  email: Joi.string().email().min(5).max(255)
    .required(),
  password: Joi.string().min(5).max(255).required(),
  address: Joi.string().min(5).max(255).required(),
  is_admin: Joi.boolean(),
};

export default schema;
