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

    if (!deliveryInformation) {
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

// module.exports = {

//     async updateState(req, res, next) {
//         try {
//             const { email } = req.payload;
//             const { state } = req.body;
//             const { orderId } = req.params;

//             const account = await accountModel.getByEmail(email);
//             const { role } = account;

//             const order = await orderModel.getOrderById(orderId);
//             if (!order) {
//                 return res.status(200).send({
//                     exitcode: 101,
//                     message: 'Order not found',
//                 });
//             }

//             let success = false;
//             switch (state) {
//                 // Pending to shipping (admin only)
//                 case config.orderState.SHIPPING: {
//                     if (role !== config.role.ADMIN) {
//                         throw new ErrorHandler(
//                             403,
//                             'Only admin can do this operation',
//                         );
//                     }
//                     if (order.state !== config.orderState.PENDING) {
//                         return res.status(200).send({
//                             exitcode: 102,
//                             message:
//                                 'Order can only change to shipping during pending state',
//                         });
//                     }

//                     // Check for stock
//                     const variants = await variantModel.getByOrderId({
//                         orderId,
//                     });
//                     const insufficientVariants = variants.filter(
//                         (item) => item.stock < item.quantity,
//                     );
//                     if (insufficientVariants.length > 0) {
//                         return res.status(200).send({
//                             exitcode: 103,
//                             message: 'Do not have enough stock',
//                         });
//                     }

//                     // Update quantity
//                     for (const idx in variants) {
//                         const variant = variants[idx];
//                         await variantModel.updateVariant(variant.id, {
//                             stock: variant.stock - variant.quantity,
//                         });
//                     }

//                     await orderModel.updateState(
//                         orderId,
//                         config.orderState.SHIPPING,
//                     );
//                     success = true;
//                     break;
//                 }
//                 // Pending to cancel (owner only)
//                 case config.orderState.CANCEL: {
//                     if (order.email !== email && role !== config.role.ADMIN) {
//                         throw new ErrorHandler(
//                             403,
//                             'Only order owner or admin can do this operation',
//                         );
//                     }
//                     if (order.state !== config.orderState.PENDING) {
//                         return res.status(200).send({
//                             exitcode: 104,
//                             message:
//                                 'Order can only be cancelled during pending state',
//                         });
//                     }
//                     await orderModel.updateState(
//                         orderId,
//                         config.orderState.CANCEL,
//                     );
//                     success = true;
//                     break;
//                 }
//                 // Shipping to success (owner only)
//                 case config.orderState.SUCCESS: {
//                     if (order.email !== email) {
//                         throw new ErrorHandler(
//                             403,
//                             'Only order owner can do this operation',
//                         );
//                     }
//                     if (order.state !== config.orderState.SHIPPING) {
//                         return res.status(200).send({
//                             exitcode: 105,
//                             message:
//                                 'Order can only be cancelled during pending state',
//                         });
//                     }
//                     await orderModel.updateState(
//                         orderId,
//                         config.orderState.SUCCESS,
//                     );
//                     success = true;
//                     break;
//                 }
//                 // Shipping to refunding (owner only)
//                 case config.orderState.REFUNDING: {
//                     if (order.email !== email) {
//                         throw new ErrorHandler(
//                             403,
//                             'Only order owner can do this operation',
//                         );
//                     }
//                     if (order.state !== config.orderState.SHIPPING) {
//                         return res.status(200).send({
//                             exitcode: 105,
//                             message:
//                                 'Order can only be refunded during shipping state',
//                         });
//                     }
//                     await orderModel.updateState(
//                         orderId,
//                         config.orderState.REFUNDING,
//                     );
//                     success = true;
//                     break;
//                 }
//                 // Refunding to refunded (admin only)
//                 case config.orderState.REFUNDED: {
//                     if (role !== config.role.ADMIN) {
//                         throw new ErrorHandler(
//                             403,
//                             'Only admin can do this operation',
//                         );
//                     }
//                     if (order.state !== config.orderState.REFUNDING) {
//                         return res.status(200).send({
//                             exitcode: 106,
//                             message:
//                                 'Order can only be refunded during refunding state',
//                         });
//                     }

//                     // Update quantity
//                     const variants = await variantModel.getByOrderId({
//                         orderId,
//                     });
//                     for (const idx in variants) {
//                         const variant = variants[idx];
//                         await variantModel.updateVariant(variant.id, {
//                             stock: variant.stock + variant.quantity,
//                         });
//                     }

//                     // Update order state
//                     await orderModel.updateState(
//                         orderId,
//                         config.orderState.REFUNDED,
//                     );
//                     success = true;
//                     break;
//                 }
//             }

//             if (success) {
//                 res.status(200).send({
//                     exitcode: 0,
//                     message: 'Update order state successfully',
//                 });
//             }
//         } catch (err) {
//             next(err);
//         }
//     },
// };
