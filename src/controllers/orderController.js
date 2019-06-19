import _ from 'lodash';
import Order from '../models/Order';
import Car from '../models/Car';

const orders = new Order();
const cars = new Car();

// Handle car create on POST.
export const orderCreatePost = async (req, res) => {
  try {
    const carObject = await cars.findById(req.newOrder.car_id);
    if (!carObject) {
      const response = {
        status: 400,
        error: 'Car with that id does not exist',
      };
      return res.status(400).json(response);
    }

    // User cannot order for his/her own car
    if (req.user.email === carObject.email) {
      const response = {
        status: 400,
        error: 'User cannot order for his/her own car',
      };
      return res.status(400).json(response);
    }
    req.newOrder.price = carObject.price;
    req.newOrder.buyer = req.user.id;
    const addedOrder = await orders.add(req.newOrder);
    const response = {
      status: 201,
      message: 'Order registered successfully',
      data: _.pick(addedOrder, ['id', 'car_id', 'status', 'price', 'price_offered', 'created_on']),
    };
    return res.status(200).json(response);
  } catch (err) {
    const response = {
      status: 400,
      error: err.detail,
    };
    return res.status(400).json(response);
  }
};

export const updateOrderPrice = async (req, res) => {
  try {
  //  Find order
    const order = await orders.findById(req.uuid);
    if (!order) {
      const response = {
        status: 400,
        error: 'Order does not exist',
      };
      return res.status(400).json(response);
    }
    if (order.status !== 'pending') {
      const response = {
        status: 400,
        error: 'Order status changed to non pending.',
      };
      return res.status(400).json(response);
    }
    // Update price
    const price = {
      new_price_offered: req.body.new_price_offered,
    };
    const currentPrice = order.price_offered;
    const result = await orders.update(order.id, price);

    if (!result) {
      const response = {
        status: 500,
        error: 'Cannot update price',
      };
      return res.status(500).json(response);
    }
    order.old_price_offered = currentPrice;
    order.new_price_offered = price.new_price_offered;
    const response = {
      status: 200,
      message: 'Order price successfully updated',
      data: _.pick(order, ['id', 'car_id', 'status', 'old_price_offered', 'new_price_offered']),
    };
    return res.status(200).json(response);
  } catch (err) {
    const response = {
      status: 400,
      error: err.detail,
    };
    return res.status(400).json(response);
  }
};
