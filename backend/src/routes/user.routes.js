const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', userController.createUser);
router.post('/login', userController.login);
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  return res.status(200).json({ message: 'Logout exitoso' });
});

// ⚠️ Importante: /me debe ir antes de /:id
router.get('/me', authMiddleware, userController.getMe);

router.delete('/:id', authMiddleware, userController.deleteUserById);
router.get('/:id', authMiddleware, userController.getUserById);

module.exports = router;
