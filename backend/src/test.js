const orderModel = require('./models/orderModel');
const voucher = require('./utils/voucher');
const crypto = require('./utils/crypto');
const config = require('./config');
const axios = require('axios');
const map = require('./utils/map');

const moment = require('moment');

(async () => {
    const email = 'khoiminhtrannguyen@gmail.com';
    const json = JSON.stringify({ email });
    console.log(json);
    const extraData = crypto.encryptBase64(json);
    console.log(extraData);
    const { email: decryptData } = JSON.parse(crypto.decryptBase64(extraData));
    console.log(decryptData);
})();
