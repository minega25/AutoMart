import Joi from '@hapi/joi';

const schema = {
  owner: Joi.string().min(5).max(255).required(),
  state: Joi.string().min(3).max(7).required(),
  status: Joi.string().min(3).max(10).required(),
  price: Joi.number().required(),
  manufacturer: Joi.string().min(3).max(255).required(),
  model: Joi.string().min(3).max(255).required(),
  body_type: Joi.string().min(3).max(255).required(),
};

export default schema;
