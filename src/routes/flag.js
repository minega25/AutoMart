import express from 'express';

import flagCreatePost from '../controllers/flagController';
import validatePostFlag from '../middleware/validate/validatePostFlag';


const router = express.Router();

// POST request to create a flag
router.post('/', validatePostFlag, flagCreatePost);

export default router;
