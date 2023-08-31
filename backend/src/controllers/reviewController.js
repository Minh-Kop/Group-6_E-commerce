const moment = require('moment');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const orderModel = require('../models/orderModel');
const reviewModel = require('../models/reviewModel');
const config = require('../config');

exports.createReview = catchAsync(async (req, res, next) => {
    const { bookId, orderId, rating, comment } = req.body;
    const { email } = req.user;

    // Check order exist
    const orderData = await orderModel.getDetailedOrder(orderId);
    if (!orderData[0] || !orderData[1].length) {
        return next(new AppError('Order not found.', 400));
    }
    const { orderState, createdTime } = orderData[1][0];
    const { email: orderEmail } = orderData[3][0];
    const expirationDate = moment(createdTime)
        .subtract(7, 'h')
        .startOf('day')
        .add(31, 'd');

    // Check for owner
    if (orderEmail !== email) {
        return next(new AppError("Only this order's owner can review.", 403));
    }

    // Check for order state (must be success)
    if (orderState !== config.orderState.SUCCESS) {
        return next(
            new AppError(
                "Order can only be reviewed when it's in success state.",
                400,
            ),
        );
    }

    // Check if the review exceeds the expiration date (30 days after success state)
    if (moment().isAfter(expirationDate)) {
        return next(new AppError('Exceed the expiration date.', 400));
    }

    // Create review
    const result = await reviewModel.createReview({
        bookId,
        orderId,
        rating,
        comment,
    });

    if (result === 1) {
        return res.status(200).json({
            status: 'success',
        });
    }
    if (result === -1) {
        return next(new AppError('This item is not in this order.', 400));
    }
    if (result === -2) {
        return next(
            new AppError("This order's item is already reviewed.", 400),
        );
    }
    if (result === -3) {
        return next(
            new AppError("This order's item is no longer existed.", 400),
        );
    }
    return next(new AppError('Created failed.', 500));
});

exports.getReview = catchAsync(async (req, res, next) => {
    const { productId, orderId, bookId } = req.query;

    const result = await reviewModel.getReview({
        productId,
        orderId,
        bookId,
    });
    const reviews = result.map((review) => ({
        email: review.email,
        fullName: review.fullname,
        avatarPath: review.avatar_path,
        bookId: review.variant_id,
        orderId: review.order_id,
        rating: review.rating,
        comment: review.comment,
        createdTime: review.created_time,
    }));
    res.status(200).send({
        exitcode: 0,
        message: 'Get product review successfully',
        reviews: reviews,
    });
});
