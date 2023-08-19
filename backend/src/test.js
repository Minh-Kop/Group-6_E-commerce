// const bookModel = require('./models/bookModel');
const accountModel = require('./models/categoryModel');
const crypto = require('./utils/crypto');
const config = require('./config');
const axios = require('axios');
const map = require('./utils/map');

const moment = require('moment');
const Openrouteservice = require('openrouteservice-js');

(async () => {
    // https://maps.googleapis.com/maps/api/geocode/json?address=Washington&bounds=36.47,-84.72%7C43.39,-65.90&key=AIzaSyApmwFdK0RSyj-bpRVuvynkhCsNaqMZZBY
    const result = await map.getCoordinate(
        '290 đường An Dương Vương',
        'Phường 4',
        'Quận 5',
        'Thành phố Hồ Chí Minh',
    );
    // console.log(result.data);
    // console.log(result.data.results[0]);
    // console.log(result.data.results[0].geometry.location);
    console.log(result);
})();
