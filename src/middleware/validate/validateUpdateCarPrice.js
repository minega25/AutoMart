import Joi from '@hapi/joi';
import updateCarPriceSchema from '../../helpers/validationShemas/updateCarPriceSchema';

const validateUpdateCarPrice = (req, res, next) => {
  // Validate incoming user input
  const { uuid } = req.params;
  const { price } = req.body;
  const { error } = Joi.validate({ price, uuid }, updateCarPriceSchema);
  if (error) {
    const response = {
      status: 400,
      error: error.details[0].message,
    };
    return res.status(400).json(response);
  }
  req.uuid = uuid;
  req.price = price;
  next();
};

export default validateUpdateCarPrice;
