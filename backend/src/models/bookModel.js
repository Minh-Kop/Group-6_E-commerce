const sql = require('mssql');

const database = require('../utils/database');

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
        sqlString += ` order by ${sortType} ${check ? 'desc' : 'asc'}`;
        sqlString += ` OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`;

        const pool = await database.getConnectionPool();
        const request = new sql.Request(pool);
        const result = await request.query(sqlString);
        return result.recordset;
    } catch (err) {
        console.log(err);
    }
};
