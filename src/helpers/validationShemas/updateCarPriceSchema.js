import Joi from '@hapi/joi';

const schema = {
  price: Joi.number().required(),
  carId: Joi.string().guid({ version: 'uuidv4' }),
};

export default schema;
