const sql = require('mssql/msnodesqlv8');

const database = require('../utils/database');

exports.insertImage = async (bookId, index, entity) => {
    const sqlString = `insert into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('${bookId}', ${index}, '${entity.path}', '${entity.filename}')`;
    const pool = await database.getConnectionPool();
    const request = new sql.Request(pool);
    await request.query(sqlString);
};

exports.getNewBookId = async () => {
    const sqlString = `select dbo.f_CreateBookId()`;
    const pool = await database.getConnectionPool();
    const request = new sql.Request(pool);
    const result = await request.query(sqlString);
    return result.recordset[0][''];
};

exports.getBookImages = async (bookId) => {
    const sqlString = `select IMAGE_ID, BOOK_PATH from BOOK_IMAGES where BOOK_ID = '${bookId}'`;
    const pool = await database.getConnectionPool();
    const request = new sql.Request(pool);
    const result = await request.query(sqlString);
    return result.recordset;
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
        sqlString += ' and b.stock > 0 and b.SOFT_DELETE = 0';
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
    const pool = await database.getConnectionPool();

    const request1 = new sql.Request(pool);
    request1.input('BookId', sql.Char, bookId);
    let result = await request1.execute('sp_GetBook');
    if (result.returnValue !== 1) {
        return result.recordset[0];
    }
    result = result.recordset[0];

    const request2 = new sql.Request(pool);
    request2.input('BookId', sql.Char, bookId);
    let authors = await request2.execute('sp_GetAuthors');
    // authors = authors.recordsets[0].map((el) => el.AUTHOR_NAME);
    authors = authors.recordset.map((el) => el.AUTHOR_NAME).join(', ');
    result.author = authors;
    return result;
};

exports.createBook = async (bookEntity) => {
    const {
        categoryId,
        bookName,
        originalPrice,
        coverImage,
        stock,
        discountedNumber,
        discountedPrice,
        authorId,
        publisherId,
        publishedYear,
        weight,
        numberPage,
        bookFormat,
        description,
    } = bookEntity;

    const pool = await database.getConnectionPool();

    const request = new sql.Request(pool);
    request.input('categoryId', sql.Char, categoryId);
    request.input('bookName', sql.NVarChar, bookName);
    request.input('originalPrice', sql.Int, originalPrice);
    request.input('imagePath', sql.NVarChar, coverImage.path);
    request.input('imageFilename', sql.NVarChar, coverImage.filename);
    request.input('stock', sql.Int, stock);
    request.input('discountedNumber', sql.Int, discountedNumber);
    request.input('discountedPrice', sql.Int, discountedPrice);
    request.input('publisherId', sql.Char, publisherId);
    request.input('publishedYear', sql.Int, publishedYear);
    request.input('weight', sql.Int, weight);
    request.input('numberPage', sql.Int, numberPage);
    request.input('bookFormat', sql.NVarChar, bookFormat);
    request.input('description', sql.NVarChar, description);
    let result = await request.execute('sp_CreateBook');

    if (result.returnValue === 0) {
        return null;
    }

    const bookId = result.recordset[0].id;
    let sqlString = `insert into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values `;
    for (let i = 0; i < authorId.length; i++) {
        sqlString += `('${bookId}', '${authorId[i]}')${
            i !== authorId.length - 1 ? ', ' : ''
        }`;
    }
    const request2 = new sql.Request(pool);
    result = await request2.query(sqlString);

    return bookId;
};

exports.updateProduct = async (productId, entity) => {
    const { productName, categoryId, description } = entity;
};
