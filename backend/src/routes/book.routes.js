const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const authMiddleware = require('../middleware/auth.middleware');

const multer = require('multer');
const upload = multer({ dest: 'temp/' }); // archivos temporales antes de subir a Cloudinary

router.get('/', bookController.getBooks);
router.get('/:id', authMiddleware, bookController.getBookById);

router.post(
  '/',
  authMiddleware,
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
  ]),
  bookController.createBook
);

router.delete('/:id', authMiddleware, bookController.deleteBookById);

module.exports = router;
