import express from 'express';

import { orderCreatePost, updateOrderPrice } from '../controllers/orderController';
import auth from '../middleware/auth';

const router = express.Router();

// POST request to create car
router.post('/', auth, orderCreatePost);
router.patch('/:order_id/price', auth, updateOrderPrice);

export default router;
