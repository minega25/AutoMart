const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

// POST request to create user
router.post('/signup', userController.user_create_post);

module.exports = router;
