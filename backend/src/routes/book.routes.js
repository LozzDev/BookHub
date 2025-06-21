const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const authMiddleware = require('../middleware/auth.middleware');
const multer = require('multer');

const upload = multer({ dest: 'temp/' }); // archivos temporales antes de subir a Cloudinary

// 🔒 Obtener libros subidos por el usuario autenticado
router.get('/mine', authMiddleware, bookController.getBookByUserId);

// 🌍 Obtener todos los libros (público o limitado según tu lógica)
router.get('/', bookController.getBooks);

// 🔒 Obtener un libro por ID
router.get('/:id', authMiddleware, bookController.getBookById);

// 🔒 Subir un nuevo libro
router.post(
  '/',
  authMiddleware,
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
  ]),
  bookController.createBook
);

// 🔒 Eliminar libro por ID
router.delete('/:id', authMiddleware, bookController.deleteBookById);

module.exports = router;
