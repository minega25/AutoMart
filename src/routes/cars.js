import express from 'express';

import { carCreatePost, updateCarStatus, updateCarPrice } from '../controllers/carController';
import auth from '../middleware/auth';

const router = express.Router();

// POST request to create car
router.post('/', auth, carCreatePost);
router.patch('/:car_id/status', auth, updateCarStatus);
router.patch('/:car_id/price', auth, updateCarPrice);

export default router;
