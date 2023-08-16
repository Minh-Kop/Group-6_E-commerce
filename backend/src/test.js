// const bookModel = require('./models/bookModel');
const accountModel = require('./models/cartModel');
const crypto = require('./utils/crypto');
const config = require('./config');

(async () => {
    const result= await accountModel.getCartByEmail('khoiminhtrannguyen@gmail.com')
    console.log(result);
})();

// crypto.encryptPassword('khoi123')
