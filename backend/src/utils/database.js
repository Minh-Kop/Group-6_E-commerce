const sql = require('mssql/msnodesqlv8');

const config = require('../config');

exports.getConnectionPool = async () => {
    let pool = null;

    const finalConfig = {
        ...config.DATABASE,
        driver: 'msnodesqlv8',
        options: {
            trustedConnection: true,
            // trustServerCertificate: true,
        },
    };

    try {
        pool = await new sql.ConnectionPool(finalConfig).connect();
    } catch (err) {
        console.log(err);
    }
    return pool;
};
