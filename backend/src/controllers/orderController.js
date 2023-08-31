const moment = require('moment');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const config = require('../config');
const orderModel = require('../models/orderModel');
const bookModel = require('../models/bookModel');
const accountModel = require('../models/accountModel');

exports.getOrder = catchAsync(async (req, res, next) => {
    const { orderId } = req.params;
    const [
        deliveryInformation,
        tempOrderStates,
        booksOrdered,
        orderInformation,
    ] = await orderModel.getDetailedOrder(orderId);

    if (!deliveryInformation || !tempOrderStates.length) {
        return next(new AppError('Order not found.', 400));
    }

    const orderStates = tempOrderStates.map((el) => ({
        ...el,
        createdTime: moment(el.createdTime)
            .subtract(7, 'hours')
            .format('DD/MM/YYYY HH:mm'),
    }));

    res.status(200).json({
        status: 'success',
        data: {
            deliveryInformation: deliveryInformation[0],
            orderStates,
            booksOrdered,
            orderInformation: orderInformation[0],
        },
    });
});

exports.getMe = catchAsync(async (req, res, next) => {
    req.body.email = req.user.email;
    next();
});

exports.getUserOrders = catchAsync(async (req, res, next) => {
    const { email, orderState, limit: strLimit, page: strPage } = req.body;

    const page = +strPage || 1;
    const limit = +strLimit || 10;
    const offset = (page - 1) * limit;

    const returnedOrders = await orderModel.getUserOrders({
        email,
        orderState,
        limit,
        offset,
    });
    const orders = await Promise.all(
        returnedOrders.map(async (order) => {
            const books = await bookModel.getBooksByOrderId(order.orderId);
            return {
                orderId: order.orderId,
                orderState: order.orderState,
                booksLength: books.length,
                books,
                ...order,
            };
        }),
    );

    res.status(200).json({
        status: 'success',
        ordersLength: orders.length,
        orders,
    });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
    const { orderState, limit: strLimit, page: strPage } = req.body;

    const page = +strPage || 1;
    const limit = +strLimit || 10;
    const offset = (page - 1) * limit;

    const returnedOrders = await orderModel.getAllOrders({
        orderState,
        limit,
        offset,
    });
    const orders = await Promise.all(
        returnedOrders.map(async (order) => {
            const books = await bookModel.getBooksByOrderId(order.orderId);
            return {
                orderId: order.orderId,
                orderState: order.orderState,
                booksLength: books.length,
                books,
                ...order,
            };
        }),
    );

    res.status(200).json({
        status: 'success',
        ordersLength: orders.length,
        orders,
    });
});

exports.updateState = catchAsync(async (req, res, next) => {
    const { email } = req.user;
    const orderState = +req.body.orderState;
    const { orderId } = req.params;

    const { HROLE: role } = await accountModel.getByEmail(email);

    const orderData = await orderModel.getDetailedOrder(orderId);
    if (!orderData[0] || !orderData[1].length) {
        return next(new AppError('Order not found.', 400));
    }
    const { orderState: previousState } = orderData[1][0];
    const { email: orderEmail } = orderData[3][0];

    switch (orderState) {
        // Pending to shipping (admin only)
        case config.orderState.SHIPPING: {
            if (role !== config.role.ADMIN) {
                return next(
                    new AppError(
                        'You do not have permission to perform this action!',
                        403,
                    ),
                );
            }
            if (previousState !== config.orderState.PENDING) {
                return next(
                    new AppError(
                        'Order can only change to shipping during pending state.',
                        400,
                    ),
                );
            }
            await orderModel.updateState(orderId, config.orderState.SHIPPING);
            break;
        }
        // Pending to cancel (owner only)
        case config.orderState.CANCEL: {
            if (orderEmail !== email && role !== config.role.ADMIN) {
                return next(
                    new AppError(
                        'You do not have permission to perform this action!',
                        403,
                    ),
                );
            }
            if (previousState !== config.orderState.PENDING) {
                return next(
                    new AppError(
                        'Order can only be cancelled during pending state.',
                        400,
                    ),
                );
            }
            await orderModel.updateState(orderId, config.orderState.CANCEL);
            break;
        }
        // Shipping to success (owner only)
        case config.orderState.SUCCESS: {
            if (orderEmail !== email) {
                return next(
                    new AppError(
                        'You do not have permission to perform this action!',
                        403,
                    ),
                );
            }
            if (previousState !== config.orderState.SHIPPING) {
                return next(
                    new AppError(
                        'Order can only change to success during shipping state.',
                        400,
                    ),
                );
            }
            await orderModel.updateState(orderId, config.orderState.SUCCESS);
            break;
        }
        // Shipping to refunding (owner only)
        case config.orderState.REFUNDING: {
            if (orderEmail !== email) {
                return next(
                    new AppError(
                        'Only order owner can do this operation!',
                        403,
                    ),
                );
            }
            if (previousState !== config.orderState.SHIPPING) {
                return next(
                    new AppError(
                        'Order can only be refunded during shipping state.',
                        400,
                    ),
                );
            }
            await orderModel.updateState(orderId, config.orderState.REFUNDING);
            break;
        }
        // Refunding to refunded (admin only)
        case config.orderState.REFUNDED: {
            if (role !== config.role.ADMIN) {
                return next(
                    new AppError('Only admin can do this operation!', 403),
                );
            }
            if (previousState !== config.orderState.REFUNDING) {
                return next(
                    new AppError(
                        'Order can only be refunded during refunding state.',
                        400,
                    ),
                );
            }
            await orderModel.updateState(orderId, config.orderState.REFUNDED);
            break;
        }
        default: {
            return next(new AppError('Invalid order state.', 400));
        }
    }

    res.status(200).json({
        status: 'success',
    });
});
