const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// GET /api/users
router.get('/', UserController.getAllUsers);

// GET /api/users/:id
router.get('/:id', UserController.getUserById);

// POST /api/users
router.post('/', UserController.createUser);

// PUT /api/users/:id
router.put('/:id', UserController.updateUser);

// DELETE /api/users/:id
router.delete('/:id', UserController.deleteUser);

module.exports = router;
