const sql = require('mssql/msnodesqlv8');

const database = require('../utils/database');

exports.getByEmail = async (email) => {
    const sqlString = `select * from ACCOUNT where EMAIL = '${email}'`;
    const pool = await database.getConnectionPool();
    const request = new sql.Request(pool);
    const result = await request.query(sqlString);
    return result.recordset[0];
};

exports.getByPhone = async (phoneNumber) => {
    const sqlString = `select * from ACCOUNT where PHONE_NUMBER = '${phoneNumber}'`;
    const pool = await database.getConnectionPool();
    const request = new sql.Request(pool);
    const result = await request.query(sqlString);
    return result.recordset[0];
};

exports.getDetailedUser = async (email) => {
    const pool = await database.getConnectionPool();

    const request = new sql.Request(pool);
    request.input('email', sql.NVarChar, email);
    const result = await request.execute('sp_GetDetailedAccount');
    return result;
};

exports.createAccount = async (accountEntity) => {
    const { email, phoneNumber, fullName, password, verified, token, role } =
        accountEntity;

    const pool = await database.getConnectionPool();

    const request = new sql.Request(pool);
    request.input('email', sql.NVarChar, email);
    request.input('phoneNumber', sql.Char, phoneNumber);
    request.input('fullName', sql.NVarChar, fullName);
    request.input('password', sql.NVarChar, password);
    request.input('verified', sql.Bit, verified);
    request.input('token', sql.Char, token);
    request.input('role', sql.Int, role);
    const result = await request.execute('sp_CreateAccount');
    return result;
};

exports.verifyAccount = async (token) => {
    const sqlString = `update ACCOUNT set VERIFIED = 1 where TOKEN = '${token}'`;
    const pool = await database.getConnectionPool();
    const request = new sql.Request(pool);
    const result = await request.query(sqlString);
    return result.rowsAffected[0];
};

exports.updateAccount = async (userEntity) => {
    const {
        email,
        fullName,
        password,
        phoneNumber,
        avatarPath,
        avatarFilename,
        birthday,
        gender,
    } = userEntity;

    const pool = await database.getConnectionPool();
    const transaction = new sql.Transaction(pool);
    await transaction.begin();

    let checkAccount = false;
    let checkAccountDetail = false;
    let sqlStringAccount = ``;
    let sqlStringAccountDetail = ``;

    // Create Account update string
    if (fullName) {
        checkAccount = true;
        sqlStringAccount += `FULLNAME = '${fullName}',`;
    }
    if (password) {
        checkAccount = true;
        sqlStringAccount += `ENC_PWD = '${password}',`;
    }
    if (phoneNumber) {
        checkAccount = true;
        sqlStringAccount += `PHONE_NUMBER = '${phoneNumber}',`;
    }
    if (avatarPath) {
        checkAccount = true;
        sqlStringAccount += `AVATAR_PATH = '${avatarPath}',AVATAR_FILENAME = '${avatarFilename},'`;
    }

    // Create Account Detail update string
    if (birthday) {
        checkAccountDetail = true;
        sqlStringAccountDetail += `BIRTHDAY = '${birthday}',`;
    }
    if (gender || gender === 0) {
        checkAccountDetail = true;
        sqlStringAccountDetail += `GENDER = ${gender},`;
    }

    if (checkAccount) {
        sqlStringAccount = `update ACCOUNT set ${sqlStringAccount} where email = '${email}'`;
        sqlStringAccount = sqlStringAccount.replace(/, w/, ' w');
        const accountRequest = new sql.Request(transaction);
        await accountRequest.query(sqlStringAccount);
    }
    if (checkAccountDetail) {
        sqlStringAccountDetail = `update ACCOUNT_DETAIL set ${sqlStringAccountDetail} where email = '${email}'`;
        sqlStringAccountDetail = sqlStringAccountDetail.replace(/, w/, ' w');
        console.log(sqlStringAccountDetail);
        const bookDetailRequest = new sql.Request(transaction);
        await bookDetailRequest.query(sqlStringAccountDetail);
    }

    await transaction.commit();
};
