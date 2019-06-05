import Joi from '@hapi/joi';
import _ from 'lodash';
import Order from '../models/Order';
import orderCreateSchema from '../helpers/validationShemas/orderCreateSchema';
import { car } from './carController';

const orders = new Order();

// Handle car create on POST.
export default async (req, res) => {
  const newOrder = _.pick(req.body, ['buyer', 'car_id', 'status', 'amount']);
  const { error } = Joi.validate(newOrder, orderCreateSchema);
  if (error) {
    const response = {
      status: 400,
      error: error.details[0].message,
    };
    return res.status(400).json(response);
  }

  const carObject = car.findById(newOrder.car_id);
  if (!carObject) {
    const response = {
      status: 400,
      error: 'Car with that id does not exist',
    };
    return res.status(400).json(response);
  }

  newOrder.price = carObject.price;
  const addedOrder = await orders.add(newOrder);
  const response = {
    status: 200,
    data: _.pick(addedOrder, ['id', 'car_id', 'status', 'price', 'price_offered', 'created_on']),
  };
  return res.status(200).json(response);
};
