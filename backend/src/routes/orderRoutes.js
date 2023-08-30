const express = require('express');

const orderController = require('../controllers/orderController');

const router = express.Router();

router.get('/me', orderController.getUserOrders);

router.route('/:orderId').get(orderController.getOrder);
// .patch(orderController.updateState);

module.exports = router;
