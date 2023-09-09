const moment = require('moment');
const cron = require('node-cron');

const crypto = require('./utils/crypto');
const config = require('./config');
const axios = require('axios');
const map = require('./utils/map');

(async () => {
    const cronOptions = {
        timezone: 'Asia/Ho_Chi_Minh',
    };
    let i = 1;
    cron.schedule(
        '4 0 * * *',
        () => {
            console.log(i);
            i += 1;
        },
        cronOptions,
    );
    // const accessToken =
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imtob2ltaW5odHJhbm5ndXllbkBnbWFpbC5jb20iLCJpYXQiOjE2OTQxODgwNzAsImV4cCI6MTcwMTk2NDA3MH0.YTOCc2ncowtw0meFccgEiJpvgrop0WSEPP1m82OmDnk';

    // const api = axios.create({
    //     // baseURL: 'http://localhost:3001/',
    //     baseURL: 'http://localhost:3001/',
    //     // baseURL: 'http://192.168.1.2:3001/',
    // });
    // const response = await api.get(
    //     `api/cart`,
    //     // `http://192.168.1.2:3001/api/cart`,
    //     // {},
    //     {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${accessToken}`,
    //         },
    //     },
    // );
    // console.log(response.data);
})();
