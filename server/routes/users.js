const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

// GET request to create user
router.get('/create', userController.user_create_get);

// POST request to create user
router.post('/create', userController.user_create_post);

// GET request to delete user.
router.get('/:id/delete', userController.user_delete_get);

// POST request to delete user.
router.post('/:id/delete', userController.user_delete_post);

module.exports = router;
