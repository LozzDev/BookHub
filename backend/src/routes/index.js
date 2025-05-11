const express = require('express');
const router = express.Router();
const booksRouter = require('./book.routes');
const userRouter = require('./user.routes');

router.use('/books', booksRouter);
router.use('/users', userRouter);


module.exports = router;