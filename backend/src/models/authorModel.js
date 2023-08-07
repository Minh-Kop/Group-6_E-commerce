const sql = require('mssql/msnodesqlv8');

const database = require('../utils/database');

exports.getAllAuthors = async () => {
    try {
        const pool = await database.getConnectionPool();
        const request = new sql.Request(pool);
        const result = await request.query('select * from Author');
        return result.recordset;
    } catch (err) {
        console.log(err);
    }
};

exports.createAuthor = async (authorName) => {
    const pool = await database.getConnectionPool();
    const request = new sql.Request(pool);
    request.input('author_name', sql.Char, authorName);
    const result = await request.execute('sp_CreateAuthor');
    return result.returnValue;
};
