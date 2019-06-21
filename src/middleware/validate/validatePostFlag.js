import Joi from '@hapi/joi';
import _ from 'lodash';
import flagCreateSchema from '../../helpers/validationShemas/flagCreateSchema';

const validatePostCar = (req, res, next) => {
  const newFlag = _.pick(req.body, ['car_id', 'reason', 'description']);
  const { error } = Joi.validate(newFlag, flagCreateSchema);
  if (error) {
    const response = {
      status: 400,
      error: error.details[0].message,
    };
    return res.status(400).json(response);
  }

  req.newFlag = newFlag;
  next();
};

export default validatePostCar;
