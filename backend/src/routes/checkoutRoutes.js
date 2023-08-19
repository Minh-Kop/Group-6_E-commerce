const express = require('express');

const checkout = require('../controllers/checkoutController');

const router = express.Router();

// router.post('/', checkout.getBreakDownPrice, checkout.checkout);
router.post('/', checkout.getBreakDownPrice);

// router.post('/price', checkout.getBreakDownPrice, checkout.getPrice);

// router.post('/notifyMomo', checkout.notifyMomo);
// router.post('/notifyPaypal', checkout.notifyPaypal);

module.exports = router;
