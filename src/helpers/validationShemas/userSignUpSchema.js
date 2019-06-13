import Joi from '@hapi/joi';

const schema = {
  first_name: Joi.string().trim().min(2).max(255)
    .required(),
  last_name: Joi.string().trim().min(2).max(255)
    .required(),
  email: Joi.string().trim().email({ minDomainSegments: 2 }).min(2)
    .max(255)
    .required(),
  password: Joi.string().regex(/^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$/),
  address: Joi.string().trim().min(2).max(255)
    .required(),
  is_admin: Joi.boolean(),
};

export default schema;
