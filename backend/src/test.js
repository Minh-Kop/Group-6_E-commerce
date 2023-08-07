const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const bookModel = require('./models/bookModel');

(async () => {
    const id = await bookModel.getNewBookId();
    // console.log(id['']);
    console.log(id);
})();
