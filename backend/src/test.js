const accountModel = require('./models/voucherModel');
const voucher = require('./utils/voucher');
const crypto = require('./utils/crypto');
const config = require('./config');
const axios = require('axios');
const map = require('./utils/map');

const moment = require('moment');

(async () => {
    const vouchers = await accountModel.getAllUserVouchers(
        'khoiminhtrannguyen@gmail.com',
    );
    console.log(vouchers);
    console.log(moment().subtract(7, 'hours').format('LLLL'));
})();
