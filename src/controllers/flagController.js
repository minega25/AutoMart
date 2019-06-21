import _ from 'lodash';
import Flag from '../models/Flag';
import { car } from './carController';

const flags = new Flag();

export default async (req, res) => {
  try {
    const carObject = await car.findById(req.newFlag.car_id);
    if (!carObject) {
      const response = {
        status: 400,
        error: 'Car with that id does not exist',
      };
      return res.status(400).json(response);
    }
    const addedFlag = await flags.add(req.newFlag);
    const response = {
      status: 201,
      message: 'Flag successfully submitted',
      data: _.pick(addedFlag, ['id', 'car_id', 'reason', 'description']),
    };
    return res.status(201).json(response);
  } catch (err) {
    const response = {
      status: 400,
      error: 'Bad request',
    };
    return res.status(400).json(response);
  }
};
