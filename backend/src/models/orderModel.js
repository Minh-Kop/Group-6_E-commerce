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

exports.deleteAllInitialOrders = async (email) => {
    const pool = await database.getConnectionPool();
    const request = new sql.Request(pool);
    request.input('email', sql.NVarChar, email);
    const result = await request.execute('sp_DeleteAllInitialOrders');
    return result.returnValue;
};
