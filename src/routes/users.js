const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

// POST request to create user
router.post('/signup', userController.user_create_post);

// POST request to sign in user
router.post('/signin', userController.user_login_post);
module.exports = router;
