const express = require('express');

const bookRouter = require('./bookRoutes');
const userRouter = require('./userRoutes');

const router = express.Router();

router.use('/api/books', bookRouter);
router.use('/api/users', userRouter);

module.exports = router;
