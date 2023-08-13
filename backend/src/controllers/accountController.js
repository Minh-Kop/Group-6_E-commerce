const momemt = require('moment');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const accountModel = require('../models/accountModel');
const { createUploader } = require('../utils/cloudinary');
const config = require('../config');

const createAvatarName = async (req, file) => {
    if (file.fieldname === 'avatar') {
        const { email } = req.user;
        return `${email}`;
    }
};

const avatarUploader = createUploader(
    config.CLOUDINARY_AVATAR_PATH,
    createAvatarName,
);

exports.uploadAvatar = avatarUploader.fields([{ name: 'avatar', maxCount: 1 }]);

exports.getMe = (req, res, next) => {
    req.params.email = req.user.email;
    next();
};

exports.getUser = catchAsync(async (req, res, next) => {
    const { email } = req.params;
    const detailedUser = await accountModel.getDetailedUser(email);

    // Check if this user exists
    if (detailedUser.returnValue === -1) {
        return next(new AppError('The account is no longer exist.', 400));
    }

    res.status(200).json({
        status: 'success',
        user: detailedUser.recordset[0],
    });
});

exports.updateMe = catchAsync(async (req, res, next) => {
    // Create error if user PATCHes password data
    if (req.body.password) {
        return next(
            new AppError(
                'This route is not for password updates. Please use /updatePassword!',
                400,
            ),
        );
    }

    const { email } = req.user;
    const { fullName, phoneNumber, birthday, gender } = req.body;
    const userEntity = {
        email,
        fullName,
        phoneNumber,
        birthday,
        gender: +gender,
    };

    await accountModel.updateAccount(userEntity);

    res.status(200).json({
        status: 'success',
        email,
    });
});

exports.updateAvatar = catchAsync(async (req, res, next) => {
    const { email } = req.user;
    const { path: avatarPath, filename: avatarFilename } = req.files.avatar[0];
    const userEntity = {
        email,
        avatarPath,
        avatarFilename,
    };

    await accountModel.updateAccount(userEntity);

    res.status(200).json({
        status: 'success',
        email,
    });
});
