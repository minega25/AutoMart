import Joi from '@hapi/joi';

const schema = {
  buyer: Joi.string().min(5).max(255).required(),
  car_id: Joi.string().required(),
  amount: Joi.number().required(),
  status: Joi.string().min(3).max(7).required(),
};

export default schema;
