import Joi from '@hapi/joi';

const validateId = (req, res, next) => {
  // Validate incoming user input
  const { uuid } = req.params;
  const { error } = Joi.validate(uuid, Joi.string().guid({ version: 'uuidv4' }));
  if (error) {
    const response = {
      status: 400,
      error: error.details[0].message,
    };
    return res.status(400).json(response);
  }
  req.uuid = uuid;
  next();
};

export default validateId;
