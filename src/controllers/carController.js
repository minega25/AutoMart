import Joi from '@hapi/joi';
import _ from 'lodash';
import Car from '../models/Car';
import carCreateSchema from '../helpers/validationShemas/carCreateSchema';

const cars = new Car();

// Handle car create on POST.
export const carCreatePost = async (req, res) => {
  const newCar = _.pick(req.body, ['owner', 'state', 'status', 'price', 'manufacturer', 'model', 'body_type']);
  const { error } = Joi.validate(newCar, carCreateSchema);
  if (error) {
    const response = {
      status: 400,
      error: error.details[0].message,
    };
    return res.status(400).json(response);
  }
  newCar.email = req.user.email;
  const addedCar = await cars.add(newCar);
  const response = {
    status: 200,
    data: _.pick(addedCar, ['id', 'owner', 'email', 'state', 'status', 'price', 'createdDate', 'manufacturer']),
  };
  return res.status(200).json(response);
};

export const car = cars;
