import Joi from '@hapi/joi';

const schema = {
  state: Joi.string().trim().min(1).max(7)
    .required(),
  price: Joi.number().integer().required(),
  manufacturer: Joi.string().trim().min(1).max(255)
    .required(),
  model: Joi.string().trim().min(1).max(255)
    .required(),
  body_type: Joi.string().trim().min(1).max(255)
    .required(),
};

export default schema;
