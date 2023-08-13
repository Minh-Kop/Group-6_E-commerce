// const bookModel = require('./models/bookModel');
const accountModel = require('./models/accountModel');
const crypto = require('./utils/crypto');
const config = require('./config');

(async () => {
    const newAccount = {
        email: 'khoi@gmail.com',
        verified: 1,
        role: config.role.USER,
    };
    await accountModel.createAccount(newAccount);
})();

// crypto.encryptPassword('khoi123')
