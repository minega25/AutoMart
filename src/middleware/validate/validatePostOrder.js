import Joi from '@hapi/joi';
import _ from 'lodash';
import orderCreateSchema from '../../helpers/validationShemas/orderCreateSchema';

const validatePostCar = (req, res, next) => {
  const newOrder = _.pick(req.body, ['car_id', 'status', 'amount']);
  const { error } = Joi.validate(newOrder, orderCreateSchema);
  if (error) {
    const response = {
      status: 400,
      error: error.details[0].message,
    };
    return res.status(400).json(response);
  }

  req.newOrder = newOrder;
  next();
};

export default validatePostCar;
