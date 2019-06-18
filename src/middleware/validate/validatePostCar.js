import Joi from '@hapi/joi';
import _ from 'lodash';
import carCreateSchema from '../../helpers/validationShemas/carCreateSchema';

// eslint-disable-next-line consistent-return
const validatePostCar = (req, res, next) => {
  const newCar = _.pick(req.body, ['state', 'price', 'manufacturer', 'model', 'body_type']);
  const { error } = Joi.validate(newCar, carCreateSchema);
  if (error) {
    const response = {
      status: 400,
      error: error.details[0].message,
    };
    return res.status(400).json(response);
  }
  req.newCar = newCar;
  next();
};

export default validatePostCar;
