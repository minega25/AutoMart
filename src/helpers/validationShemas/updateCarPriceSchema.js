import Joi from '@hapi/joi';

const schema = {
  price: Joi.number().required(),
  uuid: Joi.string().trim().guid({ version: 'uuidv4' }),
};

export default schema;
