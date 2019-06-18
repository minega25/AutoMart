import Joi from '@hapi/joi';

const schema = {
  car_id: Joi.string().trim().required(),
  reason: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
};

export default schema;
