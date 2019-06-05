import express from 'express';

import orderCreatePost from '../controllers/orderController';
import auth from '../middleware/auth';

const router = express.Router();

// POST request to create car
router.post('/', auth, orderCreatePost);


export default router;
