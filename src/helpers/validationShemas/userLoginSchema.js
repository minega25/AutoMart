import Joi from '@hapi/joi';

const schema = {
  email: Joi.string().trim().email({ minDomainSegments: 2 }).min(2)
    .max(255)
    .required(),
  password: Joi.string().regex(/^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$/),
};

export default schema;
