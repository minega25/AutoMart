import Joi from '@hapi/joi';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import config from 'config';
import Car from '../models/Car';
import carCreateSchema from '../helpers/validationShemas/carCreateSchema';
import updateCarPriceSchema from '../helpers/validationShemas/updateCarPriceSchema';

const cars = new Car();

// Handle car create on POST.
export const carCreatePost = async (req, res) => {
  const newCar = _.pick(req.body, ['state', 'price', 'manufacturer', 'model', 'body_type']);
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
    data: _.pick(addedCar, ['id', 'email', 'state', 'status', 'price', 'createdDate', 'manufacturer']),
  };
  return res.status(200).json(response);
};

export const updateCarStatus = (req, res) => {
// Validate incoming user input
  const carId = req.params.car_id;
  const { error } = Joi.validate(carId, Joi.string().guid({ version: 'uuidv4' }));
  if (error) {
    const response = {
      status: 400,
      error: error.details[0].message,
    };
    return res.status(400).json(response);
  }
  //  Find car
  const car = cars.findById(carId);
  if (!car) {
    const response = {
      status: 400,
      error: 'Car does not exist',
    };
    return res.status(400).json(response);
  }
  // Update car
  if (car.status === 'available') {
    car.status = 'sold';
  } else {
    car.status = 'available';
  }
  const response = {
    status: 200,
    data: _.pick(car, ['id', 'email', 'created_on', 'manufacturer', 'model', 'price', 'state', 'status']),
  };
  return res.status(200).json(response);
};

export const updateCarPrice = (req, res) => {
  // Validate incoming user input
  const carId = req.params.car_id;
  const { price } = req.body;
  const { error } = Joi.validate({ price, carId }, updateCarPriceSchema);
  if (error) {
    const response = {
      status: 400,
      error: error.details[0].message,
    };
    return res.status(400).json(response);
  }
  //  Find car
  const car = cars.findById(carId);
  if (!car) {
    const response = {
      status: 400,
      error: 'Car does not exist',
    };
    return res.status(400).json(response);
  }
  // Update price
  car.price = price;
  const response = {
    status: 200,
    data: _.pick(car, ['id', 'email', 'state', 'status', 'price', 'createdDate', 'model', 'manufacturer']),
  };
  return res.status(200).json(response);
};

export const getCar = (req, res) => {
// Validate incoming user input
  const carId = req.params.car_id;
  const { error } = Joi.validate(carId, Joi.string().guid({ version: 'uuidv4' }));
  if (error) {
    const response = {
      status: 400,
      error: error.details[0].message,
    };
    return res.status(400).json(response);
  }
  //  Find car
  const car = cars.findById(carId);
  if (!car) {
    const response = {
      status: 400,
      error: 'Car does not exist',
    };
    return res.status(400).json(response);
  }
  // return car details to client
  const response = {
    status: 200,
    data: _.pick(car,
      ['id', 'email', 'state', 'status',
        'price', 'createdDate', 'manufacturer', 'model', 'body_type']),
  };
  return res.status(200).json(response);
};

export const getCars = (req, res) => {
  if (req.query) {
    if (req.query.status === 'available') {
      if (req.query.min_price && req.query.max_price) {
        const { min_price, max_price } = req.query;
        const min = Math.min(min_price, max_price);
        const max = Math.max(min_price, max_price);
        const result = cars.findByPrice(min, max);

        // return car details to client
        const response = {
          status: 200,
          data: _.map(result, _.partialRight(_.pick,
            ['id', 'email', 'state', 'status',
              'price', 'createdDate', 'manufacturer',
              'model', 'body_type'])),
        };
        return res.status(200).json(response);
      }
      const allUnsoldCars = cars.findUnsold();
      // return car details to client
      const response = {
        status: 200,
        data: _.map(allUnsoldCars, _.partialRight(_.pick,
          ['id', 'email', 'state', 'status',
            'price', 'createdDate', 'manufacturer',
            'model', 'body_type'])),
      };
      return res.status(200).json(response);
    }
  }
  const token = req.header('x-auth-token');
  if (token) {
    try {
      const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
      if (!decoded.isAdmin) {
        return res.status(403).send({ status: 403, data: 'Unathorized access.' });
      // eslint-disable-next-line no-else-return
      } else {
        const allCars = cars.findAll();
        // return car details to client
        const response = {
          status: 200,
          data: _.map(allCars, _.partialRight(_.pick,
            ['id', 'email', 'state', 'status',
              'price', 'createdDate', 'manufacturer',
              'model', 'body_type'])),
        };
        return res.status(200).json(response);
      }
    } catch (ex) {
      return res.status(400).send('Invalid token.');
    }
  } else {
    return res.status(400).send({ status: 400, data: 'No token provided' });
  }
};

export const deleteCar = (req, res) => {
  // Validate incoming user input
  const carId = req.params.car_id;
  const { error } = Joi.validate(carId, Joi.string().guid({ version: 'uuidv4' }));
  if (error) {
    const response = {
      status: 400,
      error: error.details[0].message,
    };
    return res.status(400).json(response);
  }
  //  Find car
  const car = cars.findById(carId);
  if (!car) {
    const response = {
      status: 400,
      error: 'Car does not exist',
    };
    return res.status(400).json(response);
  }
  // delete car
  cars.delete(carId);
  const response = {
    status: 200,
    data: 'Car Ad successfully deleted',
  };
  return res.status(200).json(response);
};
export const car = cars;
