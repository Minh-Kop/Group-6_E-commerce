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
    request.query('select * from AUTHOR', (err, result) => {
        console.log(result); // return 1
        console.log(result.recordsets[0][1]);
        // console.log(result.recordsets[0][0]['AUTHOR_NAME']);
    });

    // request.input('MaDT', sql.Char, '123456');
    // request.output('Ma', sql.Char(6));
    // request.execute('sp_Test', (err, result) => {
    //     console.log(result);
    //     console.log(result.output.Ma);
    //     console.log(result.output['Ma']);
    // });
});
