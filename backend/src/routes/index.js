const express = require('express');

const bookRouter = require('./bookRoutes');

const router = express.Router();

router.use('/api/books', bookRouter);

module.exports = router;
