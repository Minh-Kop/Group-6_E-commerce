const bookModel = require('./models/bookModel');

(async () => {
    const test = `'1234'`;
    const str = `update BOOK set ${test} where BOOK_ID = ''`;
    console.log(str);
})();
