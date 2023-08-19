const sql = require('mssql/msnodesqlv8');

const database = require('../utils/database');

exports.getCartByEmail = async (email) => {
    const sqlString = `select * from CART where EMAIL = '${email}'`;
    const pool = await database.getConnectionPool();
    const request = new sql.Request(pool);
    const result = await request.query(sqlString);
    return result.recordset[0];
};

exports.updateBookInCart = async (entity) => {
    const { cartId, bookId, quantity, isClicked } = entity;
    let sqlString = '';

    if (quantity) {
        sqlString += `CART_QUANTITY = ${quantity}`;
    }
    if (isClicked || isClicked === 0) {
        if (quantity) {
            sqlString += ', ';
        }
        sqlString += `IS_CLICKED = ${isClicked}`;
    }

    sqlString = `update CART_DETAIL set ${sqlString} where CART_ID = '${cartId}' and BOOK_ID = '${bookId}'`;
    const pool = await database.getConnectionPool();
    const request = new sql.Request(pool);
    const result = await request.query(sqlString);
    return result.rowsAffected[0];
};

exports.addBookToCart = async (entity) => {
    const pool = await database.getConnectionPool();
    const { cartId, bookId, quantity, isClicked } = entity;

    const request = new sql.Request(pool);
    request.input('cartId', sql.Char, cartId);
    request.input('bookId', sql.Char, bookId);
    request.input('quantity', sql.Int, quantity);
    request.input('isClicked', sql.Bit, isClicked);
    const result = await request.execute('sp_AddBookToCart');
    return result.rowsAffected[0];
};

exports.deleteFromCart = async (cartId, bookId) => {
    const pool = await database.getConnectionPool();

    const request = new sql.Request(pool);
    request.input('cartId', sql.Char, cartId);
    request.input('bookId', sql.Char, bookId);
    const result = await request.execute('sp_DeleteBookFromCart');
    return result.rowsAffected[0];
};
