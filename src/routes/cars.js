import express from 'express';

import * as carController from '../controllers/carController';
import auth from '../middleware/auth';
import admin from '../middleware/admin';
import validatePostCar from '../middleware/validate/validatePostCar';
import validateId from '../middleware/validate/validateId';
import validateUpdateCarPrice from '../middleware/validate/validateUpdateCarPrice';

const router = express.Router();

// POST request to create car
router.post('/', [auth, validatePostCar], carController.carCreatePost);
router.patch('/:car_id/status', [auth, validateId], carController.updateCarStatus);
router.patch('/:car_id/price', [auth, validateUpdateCarPrice], carController.updateCarPrice);
router.get('/:car_id', validateId, carController.getCar);
router.get('/', carController.getCars);
router.delete('/:car_id', [auth, admin, validateId], carController.deleteCar);
export default router;
