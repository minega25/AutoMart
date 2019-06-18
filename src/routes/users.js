import express from 'express';

import { userCreatePost, userLoginPost } from '../controllers/userController';
import validateUserSignIn from '../middleware/validate/validateUserSignIn';
import validateUserSignUp from '../middleware/validate/validateUserSignUp';

const router = express.Router();

// POST request to create user
router.post('/signup', validateUserSignUp, userCreatePost);

// POST request to sign in user
router.post('/signin', validateUserSignIn, userLoginPost);
export default router;
