const express = require('express');

const categoryRouter = require('./categoryRoutes');
const bookRouter = require('./bookRoutes');
const userRouter = require('./userRoutes');
const cartRouter = require('./cartRoutes');

const router = express.Router();

router.use('/api/category', categoryRouter);
router.use('/api/books', bookRouter);
router.use('/api/users', userRouter);
router.use('/api/cart', cartRouter);

module.exports = router;
