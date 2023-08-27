const express = require('express');

const checkout = require('../controllers/checkoutController');

const router = express.Router();

router.post('/notifyPaypal', checkout.notifyPaypal);
// router.post('/notifyMomo', checkout.notifyMomo);

router.post('/voucher', checkout.addVoucher, checkout.getOrder);

router.delete('/initialOrders', checkout.deleteInitialOrders);

router.post('/', checkout.createInitialOrder, checkout.getOrder);

router
    .route('/:orderId')
    .get(checkout.getOrder)
    .patch(checkout.changeShippingAddress, checkout.getOrder)
    .post(checkout.placeOrder);

// router.post('/price', checkout.getBreakDownPrice, checkout.getPrice);

module.exports = router;
