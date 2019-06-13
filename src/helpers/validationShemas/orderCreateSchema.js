import Joi from '@hapi/joi';

const schema = {
  car_id: Joi.string().trim().required(),
  amount: Joi.number().required(),
  status: Joi.string().trim().min(1).max(7)
    .required(),
};

export default schema;
