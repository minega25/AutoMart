import express from 'express';

import flagCreatePost from '../controllers/flagController';

const router = express.Router();

// POST request to create a flag
router.post('/', flagCreatePost);

export default router;
