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
const { createUploader } = require('../utils/cloudinary');
const config = require('../config');

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

const createImageName = async (req, file) => {
    if (file.fieldname === 'coverImage') {
        let { bookId } = req.params;
        if (!bookId) {
            bookId = await bookModel.getNewBookId();
        }
        return `${bookId}-1`;
    }
    if (file.fieldname === 'images') {
        let { bookId } = req.params;
        if (!bookId) {
            bookId = await bookModel.getNewBookId();
        }
        return `${bookId}-${Date.now()}`;
    }
};

const bookImageUploader = createUploader(
    config.CLOUDINARY_PRODUCT_PATH,
    createImageName,
);

exports.uploadBookImages = bookImageUploader.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'images', maxCount: config.PRODUCT_IMAGE_NUMBER_LIMIT },
]);

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
    const books = await Promise.all(promises);

    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        numberOfProducts: books.length,
        books,
    });
});

exports.getBook = catchAsync(async (req, res, next) => {
    const { bookId } = req.params;
    const returnedBook = await bookModel.getBookById(bookId);

    if (!returnedBook) {
        return next(new AppError('No book found with that ID!', 404));
    }

    const imageList = await bookModel.getBookImages(bookId);
    const images = imageList.map((item) => ({
        id: item.IMAGE_ID,
        path: item.BOOK_PATH,
    }));

    const category = await categoryModel.getAllCategory();
    const categoryTree = buildCategoryRoot(category);
    const selectedBranch = getParentBranch(categoryTree, returnedBook.CATE_ID);

    res.status(200).json({
        status: 'success',
        book: {
            bookId: returnedBook.BOOK_ID,
            bookName: returnedBook.BOOK_NAME,
            category: selectedBranch,
            mainImage: returnedBook.BOOK_PATH,
            otherImages: images,
            originalPrice: returnedBook.BOOK_PRICE,
            discountedNumber: returnedBook.DISCOUNTED_NUMBER,
            discountedPrice: returnedBook.BOOK_DISCOUNTED_PRICE,
            avgRating: returnedBook.AVG_RATING,
            countRating: returnedBook.COUNT_RATING,
            stock: returnedBook.STOCK,
            author: returnedBook.author,
            publisher: returnedBook.PUB_NAME,
            publishedYear: returnedBook.PUBLISHED_YEAR,
            weight: returnedBook.BOOK_WEIGHT,
            numberPage: returnedBook.NUMBER_PAGE,
            bookFormat: returnedBook.BOOK_FORMAT,
            description: returnedBook.BOOK_DESC,
        },
    });
});

exports.createBook = catchAsync(async (req, res, next) => {
    const { bookName, description, categoryId } = req.body;
    const { files } = req;

    console.log(files);
    files.coverImage.map((item) => {
        console.log(item);
        console.log('=======================================');
        return 1;
    });
    files.images.map((item) => {
        console.log(item);
        console.log('=======================================');
        return 1;
    });

    // Missing image
    if (!files || files.length < 1) {
        return next(new AppError("Missing book's images", 400));
    }
    res.status(200).json({
        status: 'success',
    });

    // // Create entity to insert to database
    // const entity = {
    //     productName: productName,
    //     description: description,
    //     categoryId: categoryId,
    // };
    // const productId = await productModel.createProduct(entity);

    // // Insert images
    // const listPath = files.map((item) => ({
    //     path: item.path,
    //     filename: item.filename,
    // }));
    // listPath.forEach(async (element) => {
    //     await productModel.insertImage(productId, element);
    // });

    // res.status(200).send({
    //     exitcode: 0,
    //     message: 'Create product successfully',
    //     productId: productId,
    // });
});
