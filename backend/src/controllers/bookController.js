/* eslint-disable prefer-const */
const {
    buildCategoryRoot,
    searchCategoryTree,
    toListCategory,
    getParentBranch,
} = require('../utils/utils');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const categoryModel = require('../models/categoryModel');
const bookModel = require('../models/bookModel');

const getListCategoryId = async (categoryId) => {
    if (!categoryId) {
        return null;
    }

    const category = await categoryModel.getAllCategory();
    const categoryTree = buildCategoryRoot(category);
    const selectedNode = searchCategoryTree(categoryTree, categoryId);
    const categoryList = toListCategory(selectedNode);
    return categoryList ? categoryList.map((item) => item.id) : null;
};

exports.getAllBooks = catchAsync(async (req, res, next) => {
    let {
        categoryId,
        priceRange,
        publisherId,
        bookFormat,
        sortType,
        limit,
        page,
    } = req.query;

    if (priceRange) {
        priceRange = priceRange.split(',').map((el) => +el);
    }
    if (publisherId) {
        publisherId = publisherId.split(',').map((el) => el.trim());
    }
    if (bookFormat) {
        bookFormat = bookFormat.split(',').map((el) => el.trim());
    }
    if (limit) {
        limit = +limit;
    }

    page = +page || 1;
    limit = +limit || 12;
    const offset = (page - 1) * limit;

    const categoryIdList = await getListCategoryId(categoryId);
    const resultProduct = await bookModel.getAllBooks(
        categoryIdList,
        priceRange,
        publisherId,
        bookFormat,
        sortType,
        limit,
        offset,
    );
    const promises = resultProduct.map(async (item) => {
        return {
            bookId: item.BOOK_ID,
            bookName: item.BOOK_NAME,
            originalPrice: item.BOOK_PRICE,
            discountedPrice: item.BOOK_DISCOUNTED_PRICE,
            discountedNumber: item.DISCOUNTED_NUMBER,
            avgRating: item.AVG_RATING,
            countRating: item.COUNT_RATING,
            image: item.BOOK_PATH,
        };
    });
    const products = await Promise.all(promises);

    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        message: 'Get products successfully',
        numberOfProducts: products.length,
        products,
    });
});
