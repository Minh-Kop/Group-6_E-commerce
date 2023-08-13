const express = require('express');

const accountController = require('../controllers/accountController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signUp);
router.patch('/verify/:token', authController.verify);
router.post('/login', authController.login);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch('/updatePassword', authController.updatePassword);

router.get('/me', accountController.getMe, accountController.getUser);
router.patch('/updateMe', accountController.updateMe);

router
    .route('/avatar')
    .patch(accountController.uploadAvatar, accountController.updateAvatar);

module.exports = router;
