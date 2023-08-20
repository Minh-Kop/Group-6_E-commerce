const accountModel = require('./models/categoryModel');
const crypto = require('./utils/crypto');
const config = require('./config');
const axios = require('axios');
const map = require('./utils/map');

const moment = require('moment');

(async () => {
    const coordinate = [10.740967644454155, 106.70199655086758];
    const result = await map.getDistance1(
        config.SHOP_LAT,
        config.SHOP_LONG,
        ...coordinate,
    );
    console.log(result.data.rows[0].elements);
    // console.log(result.data.rows[0].elements[0]);
    const result2 = await map.getDistance(
        config.SHOP_LAT,
        config.SHOP_LONG,
        ...coordinate,
    );
    console.log(result2);
})();
