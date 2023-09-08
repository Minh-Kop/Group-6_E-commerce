const moment = require('moment');
const cron = require('node-cron');

const orderModel = require('./models/orderModel');
const voucher = require('./utils/voucher');
const crypto = require('./utils/crypto');
const config = require('./config');
const axios = require('axios');
const map = require('./utils/map');

(async () => {
    // const queryString = Object.keys(abc)
    //     .map((key) => `${key}=${abc[key]}`)
    //     .join('&');
    // console.log(queryString);

    // cron.schedule('1,2,4,5 * * * *', () => {
    //     console.log('running every minute 1, 2, 4 and 5');
    // });
    const accessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imtob2ltaW5odHJhbm5ndXllbkBnbWFpbC5jb20iLCJpYXQiOjE2OTQxODgwNzAsImV4cCI6MTcwMTk2NDA3MH0.YTOCc2ncowtw0meFccgEiJpvgrop0WSEPP1m82OmDnk';
    const response = await axios.get(
        // `http://localhost:3001/api/cart`,
        `http://192.168.1.2:3001/api/cart`,
        // {},
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );
    console.log(response.data);
})();
