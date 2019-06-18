import Joi from '@hapi/joi';
import _ from 'lodash';
import userSignUpSchema from '../../helpers/validationShemas/userSignUpSchema';

// eslint-disable-next-line consistent-return
const validateUserSignIn = (req, res, next) => {
  const newUser = _.pick(req.body, ['first_name', 'last_name', 'password', 'email', 'address', 'is_admin']);
  const { error } = Joi.validate(newUser, userSignUpSchema);
  if (error) {
    const response = {
      status: 400,
      error: error.details[0].message,
    };
    return res.status(400).json(response);
  }
  req.newUser = newUser;
  next();
};

export default validateUserSignIn;
