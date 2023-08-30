const express = require('express');

const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');
const config = require('../config');

const router = express.Router();

router.get('/me', orderController.getMe, orderController.getUserOrders);

// Restrict all routes to only role admin after this middleware
router.use(authController.restrictTo(config.role.ADMIN));

router.get('/user', orderController.getUserOrders);
router.route('/:orderId').get(orderController.getOrder);
// .patch(orderController.updateState);

module.exports = router;
