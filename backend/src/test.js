const sql = require('mssql');
const config = require('./config');

const pool = new sql.ConnectionPool({
    server: config.DATABASE.server,
    user: config.DATABASE.user,
    password: config.DATABASE.password,
    database: config.DATABASE.database,
});

pool.connect((err) => {
    console.log(err);
    const request = new sql.Request(pool);
    // request.query(
    //     "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'h_ORDER'",
    //     (err, result) => {
    //         console.log(err);
    //         console.log(result); // return 1
    //         console.log(result.recordsets); // return 1
    //     },
    // );

    // request.query('select 1 as number; select 2 as number', (err, result) => {
    //     console.log(result); // return 1
    //     console.log(result.recordsets); // return 1
    // });

    request.input('MaDT', sql.Char, '123456');
    request.output('Ma', sql.Char(6));
    request.execute('sp_Test', (err, result) => {
        console.log(result);
        console.log(result.output.Ma);
        console.log(result.output['Ma']);
    });
});
