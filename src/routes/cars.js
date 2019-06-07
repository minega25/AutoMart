import express from 'express';

import * as carController from '../controllers/carController';
import auth from '../middleware/auth';
import admin from '../middleware/admin';

const router = express.Router();

// POST request to create car
router.post('/', auth, carController.carCreatePost);
router.patch('/:car_id/status', auth, carController.updateCarStatus);
router.patch('/:car_id/price', auth, carController.updateCarPrice);
router.get('/:car_id', carController.getCar);
router.get('/', carController.getCars);
router.delete('/:car_id', [auth, admin], carController.deleteCar);
export default router;
