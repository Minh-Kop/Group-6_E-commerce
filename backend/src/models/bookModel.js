const sql = require('mssql/msnodesqlv8');

const database = require('../utils/database');

exports.getNewBookId = async () => {
    try {
        const sqlString = `select dbo.f_CreateBookId()`;
        const pool = await database.getConnectionPool();
        const request = new sql.Request(pool);
        const result = await request.query(sqlString);
        return result.recordset[0][''];
    } catch (err) {
        console.log(err);
        return null;
    }
};

exports.getBookImages = async (bookId) => {
    try {
        const sqlString = `select IMAGE_ID, BOOK_PATH from BOOK_IMAGES where BOOK_ID = '${bookId}'`;
        const pool = await database.getConnectionPool();
        const request = new sql.Request(pool);
        const result = await request.query(sqlString);
        return result.recordset;
    } catch (err) {
        console.log(err);
        return null;
    }
};

exports.getAllBooks = async (
    categoryIdList,
    priceRange,
    publisherId,
    bookFormat,
    sortType = 'BOOK_DISCOUNTED_PRICE',
    limit,
    offset,
) => {
    try {
        let sqlString =
            'select b.* from BOOK b join BOOK_DETAIL d on d.BOOK_ID = b.BOOK_ID';
        if (categoryIdList) {
            let strList = '';
            for (let i = 0; i < categoryIdList.length; i++) {
                strList += `'${categoryIdList[i]}'`;
                if (i !== categoryIdList.length - 1) {
                    strList += ',';
                }
            }
            sqlString += ` where b.CATE_ID in (${strList})`;
        }
        if (priceRange) {
            sqlString += ` and b.BOOK_DISCOUNTED_PRICE >= ${priceRange[0]}`;
            sqlString += ` and b.BOOK_DISCOUNTED_PRICE < ${priceRange[1]}`;
        }
        if (publisherId) {
            let strList = '';
            for (let i = 0; i < publisherId.length; i++) {
                strList += `'${publisherId[i]}'`;
                if (i !== publisherId.length - 1) {
                    strList += ',';
                }
            }
            sqlString += ` and d.PUB_ID in (${strList})`;
        }
        if (bookFormat) {
            let strList = '';
            for (let i = 0; i < bookFormat.length; i++) {
                strList += `N'${bookFormat[i]}'`;
                if (i !== bookFormat.length - 1) {
                    strList += ',';
                }
            }
            sqlString += ` and d.book_format in (${strList})`;
        }
        if (!/\bwhere\b/i.test(sqlString)) {
            sqlString = sqlString.replace(/\band\b/i, 'where');
        }
        const check = sortType[0] === '-';
        if (check) {
            sortType = sortType.substring(1);
        }
        sqlString += ' and b.stock > 0';
        sqlString += ` order by ${sortType} ${check ? 'desc' : 'asc'}`;
        sqlString += ` OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`;

        const pool = await database.getConnectionPool();
        const request = new sql.Request(pool);
        const result = await request.query(sqlString);
        return result.recordset;
    } catch (err) {
        console.log(err);
        return null;
    }
};

exports.getBookById = async (bookId) => {
    let sqlString = 'sp_GetBook';
    const pool = await database.getConnectionPool();

    const request1 = new sql.Request(pool);
    request1.input('BookId', sql.Char, bookId);
    let result = await request1.execute(sqlString);
    if (result.returnValue !== 1) {
        return result.recordset[0];
    }
    result = result.recordset[0];

    sqlString = 'sp_GetAuthors';
    const request2 = new sql.Request(pool);
    request2.input('BookId', sql.Char, bookId);
    let authors = await request2.execute(sqlString);
    // authors = authors.recordsets[0].map((el) => el.AUTHOR_NAME);
    authors = authors.recordset.map((el) => el.AUTHOR_NAME).join(', ');
    result.author = authors;
    return result;
};

exports.updateProduct = async (productId, entity) => {
    const { productName, categoryId, description } = entity;
    const result = await db('product')
        .where({
            id: productId,
        })
        .update({
            product_name: productName,
            description: description,
            category_id: categoryId,
        })
        .select('id');
    return result;
};
