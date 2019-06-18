import express from 'express';

import { orderCreatePost, updateOrderPrice } from '../controllers/orderController';
import auth from '../middleware/auth';
import validatePostOrder from '../middleware/validate/validatePostOrder';
import validateId from '../middleware/validate/validateId';

const router = express.Router();

// POST request to create car
router.post('/', [auth, validatePostOrder], orderCreatePost);
router.patch('/:order_id/price', [auth, validateId], updateOrderPrice);

export default router;
