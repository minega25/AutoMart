import Joi from '@hapi/joi';

const schema = {
  amount: Joi.number().required(),
};

export default schema;
