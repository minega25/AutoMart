import express from 'express';

import carCreatePost from '../controllers/carController';
import auth from '../middleware/auth';

const router = express.Router();

// POST request to create car
router.post('/', auth, carCreatePost);


export default router;
