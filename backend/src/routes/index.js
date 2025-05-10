const express = require('express');
const router = express.Router();
const booksRouter = require('./book.routes');

router.use('/', booksRouter);

module.exports = router;