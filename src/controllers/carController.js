import Joi from '@hapi/joi';
import _ from 'lodash';
import Car from '../models/Car';
import carCreateSchema from '../helpers/validationShemas/carCreateSchema';
import updateCarPriceSchema from '../helpers/validationShemas/updateCarPriceSchema';

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
  car.status = 'sold';
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
      ['id', 'owner', 'email', 'state', 'status',
        'price', 'createdDate', 'manufacturer', 'model', 'body_type']),
  };
  return res.status(200).json(response);
};

export const getCars = (req, res) => {
  if (req.query) {
    if (req.query.status === 'available') {
      if (req.query.min_price && req.query.max_price) {
        const result = cars.findByPrice(req.query.min_price, req.query.max_price);
        // return car details to client
        const response = {
          status: 200,
          data: _.map(result, _.partialRight(_.pick,
            ['id', 'owner', 'email', 'state', 'status',
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
          ['id', 'owner', 'email', 'state', 'status',
            'price', 'createdDate', 'manufacturer',
            'model', 'body_type'])),
      };
      return res.status(200).json(response);
    }
  }

  const response = {
    status: 400,
    error: 'Bad Request. Check your url structure',
  };
  return res.status(400).json(response);
};

export const car = cars;
