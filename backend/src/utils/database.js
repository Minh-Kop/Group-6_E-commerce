const sql = require('mssql');

const config = require('../config');

exports.getConnectionPool = async () => {
    let pool = null;
    try {
        pool = await new sql.ConnectionPool(config.DATABASE).connect();
    } catch (err) {
        console.log(err);
    }
    return pool;
};
