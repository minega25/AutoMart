import Joi from '@hapi/joi';

const schema = {
  buyer: Joi.string().trim().min(2).max(255)
    .required(),
  car_id: Joi.string().trim().required(),
  amount: Joi.number().required(),
  status: Joi.string().trim().min(1).max(7)
    .required(),
};

export default schema;
