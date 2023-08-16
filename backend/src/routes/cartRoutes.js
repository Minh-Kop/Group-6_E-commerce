const express = require('express');

const cart = require('../controllers/cartController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router.route('/').get(cart.getCart).post(cart.addBookToCart);

router
    .route('/:bookId')
    .patch(cart.updateBookInCart)
    .delete(cart.deleteBookFromCart);

module.exports = router;
