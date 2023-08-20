const express = require('express');

const checkout = require('../controllers/checkoutController');

const router = express.Router();

router.post('/', checkout.createInitialOrder);

router.delete('/initialOrders', checkout.deleteInitialOrders);

// router.post('/price', checkout.getBreakDownPrice, checkout.getPrice);

// router.post('/notifyMomo', checkout.notifyMomo);
// router.post('/notifyPaypal', checkout.notifyPaypal);

module.exports = router;
