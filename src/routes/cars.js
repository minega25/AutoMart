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
router.patch('/:uuid/status', [auth, validateId], carController.updateCarStatus);
router.patch('/:uuid/price', [auth, validateUpdateCarPrice], carController.updateCarPrice);
router.get('/:uuid', validateId, carController.getCar);
router.get('/', carController.getCars);
router.delete('/:uuid', [auth, admin, validateId], carController.deleteCar);
export default router;
