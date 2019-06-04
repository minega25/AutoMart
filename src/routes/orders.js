import express from 'express';

import orderCreatePost from '../controllers/orderController';

const router = express.Router();

// POST request to create car
router.post('/', orderCreatePost);


export default router;
