const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUserById);
router.post('/login', userController.login);
router.get('/:id', userController.getUserById);
module.exports = router;