const express = require('express');

const bookController = require('../controllers/bookController');

const router = express.Router();

router
    .route('/')
    .get(bookController.getAllBooks)
    .post(bookController.uploadBookImages, bookController.createBook);

router
    .route('/:bookId')
    .get(bookController.getBook)
    .post(bookController.uploadBookImages, bookController.createBook);

module.exports = router;
