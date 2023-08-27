const orderIdGenerator = require('order-id');

/**
 * Generate mostly unique ID for order
 * @returns {String} The generated orderId
 */
exports.generateOrderId = () => {
    const generator = orderIdGenerator();
    return generator.generate();
};
