const express = require('express');

const checkout = require('../controllers/checkoutController');

const router = express.Router();

router.post('/', checkout.createInitialOrder, checkout.getOrder);
router
    .route('/:orderId')
    .get(checkout.getOrder)
    .patch(checkout.changeShippingAddress, checkout.getOrder);

router.post('/voucher', checkout.addVoucher, checkout.getOrder);

router.delete('/initialOrders', checkout.deleteInitialOrders);

// router.post('/price', checkout.getBreakDownPrice, checkout.getPrice);

// router.post('/notifyMomo', checkout.notifyMomo);
// router.post('/notifyPaypal', checkout.notifyPaypal);

module.exports = router;
