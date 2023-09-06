const express = require('express');

const bookController = require('../controllers/bookController');

const router = express.Router();

router
    .route('/')
    .get(bookController.getAllBooks)
    .post(bookController.uploadBookImages, bookController.createBook);

router.get('/related/:bookId', bookController.getRelatedBooks);

router
    .route('/images/:bookId')
    .patch(bookController.uploadBookImages, bookController.updateBookImages)
    .delete(bookController.deleteBookImage);

router
    .route('/:bookId')
    .get(bookController.getBook)
    .patch(bookController.updateBook)
    .delete(bookController.deleteBook);

module.exports = router;
