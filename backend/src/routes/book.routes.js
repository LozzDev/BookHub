const express = require('express');
const bookController = require('../controllers/book.controller');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');


router.get('/', bookController.getBooks);
router.get('/:id',authMiddleware, bookController.getBookById);
router.post('/',authMiddleware, bookController.createBook);
router.delete('/:id',authMiddleware, bookController.deleteBookById);

module.exports = router;