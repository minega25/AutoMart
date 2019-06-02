import express from 'express';

import { userCreatePost, userLoginPost } from '../controllers/userController';

const router = express.Router();

// POST request to create user
router.post('/signup', userCreatePost);

// POST request to sign in user
router.post('/signin', userLoginPost);
export default router;
