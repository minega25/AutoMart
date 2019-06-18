import Joi from '@hapi/joi';
import updateCarPriceSchema from '../../helpers/validationShemas/updateCarPriceSchema';

const validateUpdateCarPrice = (req, res, next) => {
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
  req.carId = carId;
  req.price = price;
  next();
};

export default validateUpdateCarPrice;
