import _ from 'lodash';
import Flag from '../models/Flag';
import { car } from './carController';

const flags = new Flag();

export default async (req, res) => {
  const carObject = car.findById(req.newFlag.car_id);
  if (!carObject) {
    const response = {
      status: 400,
      error: 'Car with that id does not exist',
    };
    return res.status(400).json(response);
  }
  const addedFlag = await flags.add(req.newFlag);
  const response = {
    status: 200,
    data: _.pick(addedFlag, ['id', 'car_id', 'reason', 'description']),
  };
  return res.status(200).json(response);
};
