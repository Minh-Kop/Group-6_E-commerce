const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const config = require('../config');

const bookModel = require('../models/bookModel');
const cartModel = require('../models/cartModel');
const shippingAddressModel = require('../models/shippingAddressModel');
const { getDistance } = require('../utils/map');
const orderModel = require('../models/orderModel');
// const voucherModel = require('../models/voucherModel');
// const paymentModel = require('../models/paymentModel');
// const accountModel = require('../models/accountModel');
// const {
//     MomoCheckoutProvider,
//     PaypalCheckoutProvider,
//     ShipCodCheckoutProvider,
// } = require('../utils/checkout');
// const { getRate } = require('../utils/currencyConverter');
// const { getOrderEmail, createTransport } = require('../utils/nodemailer');

exports.createInitialOrder = catchAsync(async (req, res, next) => {
    const { email } = req.user;

    // Delete older initial orders
    await orderModel.deleteAllInitialOrders(email);

    // Prepare order items
    let books;

    const { CART_ID: cartId, CART_TOTAL: merchandiseSubtotal } =
        await cartModel.getCartByEmail(email);
    books = await bookModel.getBooksByCartId(cartId);

    books = books.filter((el) => el.isClicked);

    // Get shipping address
    let shippingAddress =
        await shippingAddressModel.getShippingAddressesByEmail(email);
    shippingAddress = shippingAddress.filter((el) => el.isDefault)[0];

    // Is there no shipping address?
    if (!shippingAddress) {
        return next(
            new AppError('Missing shipping address! Please create one.', 400),
        );
    }

    // Calculate shipping fee
    const distance = await getDistance(
        config.SHOP_LAT,
        config.SHOP_LONG,
        shippingAddress.lat,
        shippingAddress.lng,
    );
    let shippingFee;
    if (distance) {
        if (distance < 5000) {
            shippingFee = 20000;
        } else {
            shippingFee = 30000;
        }
    } else {
        shippingFee = 0;
    }

    // Create an order
    const result = await orderModel.createInitialOrder({
        email,
        addrId: shippingAddress.addrId,
        merchandiseSubtotal,
        shippingFee,
    });

    if (result.returnValue !== 1) {
        return next(new AppError('Create order failed.', 500));
    }

    const { orderId } = result.recordset[0];

    // Transfer clicked books in cart to order
    const isCreatedList = await Promise.all(
        books.map(async (book) => {
            const createdResult = await orderModel.createDetailedOrder({
                orderId,
                bookId: book.bookId,
                quantity: book.quantity,
                price: book.cartPrice,
            });
            return {
                bookId: book.bookId,
                createdResult,
            };
        }),
    );

    // If there is any failed book creation, delete that book from the cart
    const isFailedList = await Promise.all(
        isCreatedList.map(async ({ bookId, createdResult }) => {
            if (createdResult !== 1) {
                await cartModel.deleteFromCart(cartId, bookId);
            }
            return createdResult;
        }),
    );

    // If there is any failed book creation, delete this order
    if (isFailedList.includes(0) || isFailedList.includes(-1)) {
        await orderModel.deleteAllInitialOrders(email);
        throw new AppError(
            `There is at least 1 book's quantity that exceeds its stock.`,
            400,
        );
    }

    const [deliveryInformation, booksOrdered, orderInformation] =
        await orderModel.getInitialOrder(orderId);
    res.status(200).json({
        status: 'success',
        data: {
            deliveryInformation: deliveryInformation[0],
            booksOrdered: booksOrdered,
            orderInformation: orderInformation[0],
        },
    });
});

exports.deleteInitialOrders = catchAsync(async (req, res, next) => {
    const { email } = req.user;
    const result = await orderModel.deleteAllInitialOrders(email);
    if (result <= 0) {
        return next(new AppError('Order not found.', 400));
    }
    res.status(200).json({
        status: 'success',
    });
});
