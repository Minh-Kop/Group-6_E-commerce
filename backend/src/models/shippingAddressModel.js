const sql = require('mssql/msnodesqlv8');

const database = require('../utils/database');

exports.getShippingAddressesByEmail = async (email) => {
    const pool = await database.getConnectionPool();

    const request = new sql.Request(pool);
    request.input('email', sql.NVarChar, email);
    const result = await request.execute('sp_GetAllUserShippingAddresses');
    return result.recordset;
};

exports.getShippingAddressById = async (shippingAddressId) => {
    const result = await db('shipping_address')
        .join('province', 'shipping_address.province_id', 'province.id')
        .join('district', 'shipping_address.district_id', 'district.id')
        .join('ward', 'shipping_address.ward_id', 'ward.id')
        .where({
            'shipping_address.id': shippingAddressId,
        })
        .select(
            'province.province_name',
            'district.district_name',
            'ward.ward_name',
            'shipping_address.id',
            'shipping_address.email',
            'shipping_address.address',
            'lat',
            'long',
        );
    return result[0] || null;
};

exports.createShippingAddress = async (entity) => {
    const {
        email,
        address,
        wardId,
        distId,
        provId,
        fullName,
        phoneNumber,
        isDefault,
        lat,
        lng,
    } = entity;
    const pool = await database.getConnectionPool();

    const request = new sql.Request(pool);
    request.input('email', sql.NVarChar, email);
    request.input('address', sql.NVarChar, address);
    request.input('wardId', sql.Char, wardId);
    request.input('distId', sql.Char, distId);
    request.input('provId', sql.Char, provId);
    request.input('fullName', sql.NVarChar, fullName);
    request.input('phoneNumber', sql.Char, phoneNumber);
    request.input('isDefault', sql.Bit, isDefault);
    request.input('lat', sql.Float, lat);
    request.input('lng', sql.Float, lng);
    const result = await request.execute('sp_CreateShippingAddress');
    return result.rowsAffected[0];
};

exports.updateShippingAddress = async (entity) => {
    const {
        email,
        addrId,
        address,
        wardId,
        distId,
        provId,
        fullName,
        phoneNumber,
        isDefault,
        lat,
        lng,
    } = entity;
    const pool = await database.getConnectionPool();

    const request = new sql.Request(pool);
    request.input('addrId', sql.Char, addrId);
    request.input('email', sql.NVarChar, email);
    request.input('address', sql.NVarChar, address);
    request.input('wardId', sql.Char, wardId);
    request.input('distId', sql.Char, distId);
    request.input('provId', sql.Char, provId);
    request.input('fullName', sql.NVarChar, fullName);
    request.input('phoneNumber', sql.Char, phoneNumber);
    request.input('isDefault', sql.Bit, isDefault);
    request.input('lat', sql.Float, lat);
    request.input('lng', sql.Float, lng);
    const result = await request.execute('sp_UpdateShippingAddress');
    return result.rowsAffected[0];
};

exports.deleteShippingAddress = async (addrId) => {
    const sqlString = `delete from SHIPPING_ADDRESS where ADDR_ID = '${addrId}'`;
    const pool = await database.getConnectionPool();
    const request = new sql.Request(pool);
    const result = await request.query(sqlString);
    return result.rowsAffected[0];
};
