import express from 'express';

import { carCreatePost, updateCarStatus } from '../controllers/carController';
import auth from '../middleware/auth';

const router = express.Router();

// POST request to create car
router.post('/', auth, carCreatePost);
router.patch('/:car_id/status', auth, updateCarStatus);

export default router;
