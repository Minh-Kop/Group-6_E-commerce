const sql = require('mssql/msnodesqlv8');

const database = require('../utils/database');

exports.createInitialOrder = async (entity) => {
    const { email, addrId, merchandiseSubtotal, shippingFee } = entity;
    const pool = await database.getConnectionPool();

    const request = new sql.Request(pool);
    request.input('email', sql.NVarChar, email);
    request.input('addrId', sql.Char, addrId);
    request.input('merchandiseSubtotal', sql.Int, merchandiseSubtotal);
    request.input('shippingFee', sql.Int, shippingFee);
    const result = await request.execute('sp_CreateOrder');
    return result;
};

exports.createDetailedOrder = async (entity) => {
    const { orderId, bookId, quantity, price } = entity;
    const pool = await database.getConnectionPool();

    const request = new sql.Request(pool);
    request.input('orderId', sql.Char, orderId);
    request.input('bookId', sql.Char, bookId);
    request.input('quantity', sql.Int, quantity);
    request.input('price', sql.Int, price);
    const result = await request.execute('sp_CreateOrderDetail');
    return result.returnValue;
};

exports.getInitialOrder = async (orderId) => {
    const pool = await database.getConnectionPool();
    const request = new sql.Request(pool);
    request.input('orderId', sql.Char, orderId);
    const result = await request.execute('sp_GetInitialOrder');
    return result.recordsets;
};

exports.getDetailedOrder = async (orderId) => {
    const pool = await database.getConnectionPool();
    const request = new sql.Request(pool);
    request.input('orderId', sql.Char, orderId);
    const result = await request.execute('sp_GetDetailedOrder');
    return result.recordsets;
};

exports.getUserOrders = async (email, orderState) => {
    const pool = await database.getConnectionPool();
    const request = new sql.Request(pool);
    request.input('email', sql.NVarChar, email);
    request.input('orderState', sql.Int, orderState);
    const result = await request.execute('sp_GetUserOrders');
    return result.recordset;
};

exports.getTotalPayment = async (orderId) => {
    const pool = await database.getConnectionPool();
    const request = new sql.Request(pool);
    request.input('orderId', sql.Char, orderId);
    const result = await request.execute(`sp_IsPlacedOrder`);

    if (result.returnValue !== 1) {
        return {
            totalPayment: null,
        };
    }
    return result.recordset[0];
};

exports.deleteAllInitialOrders = async (email) => {
    const pool = await database.getConnectionPool();
    const request = new sql.Request(pool);
    request.input('email', sql.NVarChar, email);
    const result = await request.execute('sp_DeleteAllInitialOrders');
    return result.returnValue;
};

exports.changeShippingAddress = async (entity) => {
    const { orderId, addrId, shippingFee } = entity;
    const pool = await database.getConnectionPool();
    const request = new sql.Request(pool);
    request.input('orderId', sql.Char, orderId);
    request.input('addrId', sql.Char, addrId);
    request.input('shippingFee', sql.Int, shippingFee);
    const result = await request.execute('sp_ChangeShippingAddress');
    return result.returnValue;
};

exports.updateState = async (orderId, orderState) => {
    const pool = await database.getConnectionPool();
    const request = new sql.Request(pool);
    request.input('orderId', sql.Char, orderId);
    request.input('orderState', sql.Int, orderState);
    const result = await request.execute('sp_CreateNewState');
    return result.returnValue;
};
