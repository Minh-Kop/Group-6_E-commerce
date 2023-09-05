const orderModel = require('./models/orderModel');
const voucher = require('./utils/voucher');
const crypto = require('./utils/crypto');
const config = require('./config');
const axios = require('axios');
const map = require('./utils/map');

const moment = require('moment');

(async () => {
    const abc = {
        a: { y: 2 },
        b: 2,
        c: 3,
    };
    // const queryString = Object.keys(abc)
    //     .map((key) => `${key}=${abc[key]}`)
    //     .join('&');
    // console.log(queryString);
    const customHeaders = { x: 1 };
    console.log({
        ...abc,
        a: { ...customHeaders, ...abc.a },
    });
})();
