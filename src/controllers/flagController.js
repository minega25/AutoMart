import Joi from '@hapi/joi';
import _ from 'lodash';
import flagCreateSchema from '../helpers/validationShemas/flagCreateSchema';
import Flag from '../models/Flag';
import { car } from './carController';

const flags = new Flag();

export default async (req, res) => {
  const newFlag = _.pick(req.body, ['car_id', 'reason', 'description']);
  const { error } = Joi.validate(newFlag, flagCreateSchema);
  if (error) {
    const response = {
      status: 400,
      error: error.details[0].message,
    };
    return res.status(400).json(response);
  }
  const carObject = car.findById(newFlag.car_id);
  if (!carObject) {
    const response = {
      status: 400,
      error: 'Car with that id does not exist',
    };
    return res.status(400).json(response);
  }
  const addedFlag = await flags.add(newFlag);
  const response = {
    status: 200,
    data: _.pick(addedFlag, ['id', 'car_id', 'reason', 'description']),
  };
  return res.status(200).json(response);
};
