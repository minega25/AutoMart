import Joi from '@hapi/joi';
import _ from 'lodash';
import userLoginSchema from '../../helpers/validationShemas/userLoginSchema';

// eslint-disable-next-line consistent-return
const validatePostCar = (req, res, next) => {
  const user = _.pick(req.body, ['email', 'password']);
  const { error } = Joi.validate(user, userLoginSchema);
  if (error) {
    const response = {
      status: 400,
      error: error.details[0].message,
    };
    return res.status(400).json(response);
  }
  req.user = user;
  next();
};

export default validatePostCar;
