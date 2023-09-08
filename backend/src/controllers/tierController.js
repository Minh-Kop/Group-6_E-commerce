const moment = require('moment');

const tierModel = require('../models/tierModel');

exports.updateTier = async () => {
    const currentTime = moment();
    if (currentTime.date() === 1 && currentTime.month() === 0) {
        await tierModel.updateTier();
    }
};
