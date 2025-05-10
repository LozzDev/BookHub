const express = require('express');
const bookController = require('../controllers/book.controller');
const router = express.Router();

router.get('/books', bookController.getBooks);
router.get('/books/:id', bookController.getBookById);
router.post('/books', bookController.createBook);
router.delete('books/:id', bookController.deleteBookById);

module.exports = router;