const orderModel = require('./models/orderModel');
const voucher = require('./utils/voucher');
const crypto = require('./utils/crypto');
const config = require('./config');
const axios = require('axios');
const map = require('./utils/map');

const moment = require('moment');

(async () => {
    const time = moment('2023-9-30 01:00');
    // const time = moment('2023-08-30T18:25:37.437Z')
    //     .subtract(7, 'h')
    //     .startOf('day')
    //     .add(31, 'd');
    console.log(time.format('LLLL'));
})();
