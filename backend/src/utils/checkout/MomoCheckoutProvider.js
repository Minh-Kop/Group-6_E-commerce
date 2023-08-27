const axios = require('axios');

const config = require('../../config');
const { createHmacString } = require('../crypto');
const { generateOrderId } = require('./orderIdGenerator');

class MomoCheckoutProvider {
    async createLink(amount, userInfo, redirectHost, ipnHost, extraData = '') {
        const partnerCode = config.MOMO_PARTNER_CODE;
        const accessKey = config.MOMO_ACCESS_KEY;
        const secretKey = config.MOMO_SECRET_KEY;

        const redirectUrl = `${redirectHost}/account/order`;
        const ipnUrl = `${ipnHost}/checkout/notifyMomo`;

        const orderId = generateOrderId();
        const orderInfo = `Pay for order ID ${orderId} with Momo`;
        const requestId = partnerCode + new Date().getTime();

        const requestType = 'captureWallet';

        const rawSignature = [
            `accessKey=${accessKey}`,
            `amount=${amount}`,
            `extraData=${extraData}`,
            `ipnUrl=${ipnUrl}`,
            `orderId=${orderId}`,
            `orderInfo=${orderInfo}`,
            `partnerCode=${partnerCode}`,
            `redirectUrl=${redirectUrl}`,
            `requestId=${requestId}`,
            `requestType=${requestType}`,
        ].join('&');

        const signature = createHmacString(rawSignature, secretKey);

        const requestBody = {
            accessKey: accessKey,
            amount: amount,
            extraData: extraData,
            ipnUrl: ipnUrl,
            orderId: orderId,
            orderInfo: orderInfo,
            partnerCode: partnerCode,
            redirectUrl: redirectUrl,
            requestId: requestId,
            requestType: requestType,
            userInfo: userInfo,
            signature: signature,
        };

        try {
            const response = await axios.post(
                'https://test-payment.momo.vn:443/v2/gateway/api/create',
                requestBody,
            );

            const { payUrl } = response.data;
            return [orderId, payUrl];
        } catch (error) {
            throw error;
        }
    }

    async queryPayment(requestId, orderId) {
        const partnerCode = config.MOMO_PARTNER_CODE;
        const accessKey = config.MOMO_ACCESS_KEY;
        const secretKey = config.MOMO_SECRET_KEY;
        const lang = 'en';

        const rawSignature = [
            `accessKey=${accessKey}`,
            `orderId=${orderId}`,
            `partnerCode=${partnerCode}`,
            `requestId=${requestId}`,
        ].join('&');

        const signature = createHmacString(rawSignature, secretKey);

        const requestBody = {
            partnerCode: partnerCode,
            requestId: requestId,
            orderId: orderId,
            lang: lang,
            signature: signature,
        };

        try {
            const response = await axios.post(
                'https://test-payment.momo.vn:443/v2/gateway/api/query',
                requestBody,
            );

            const { data } = response;
            console.log(data);
        } catch (error) {
            console.error(error.response.data);
        }
    }

    verifyIpnSignature(body) {
        const accessKey = config.MOMO_ACCESS_KEY;
        const secretKey = config.MOMO_SECRET_KEY;
        const {
            partnerCode,
            orderId,
            requestId,
            amount,
            orderInfo,
            orderType,
            transId,
            resultCode,
            message,
            payType,
            responseTime,
            extraData,
            signature,
        } = body;

        const rawSignature = [
            `accessKey=${accessKey}`,
            `amount=${amount}`,
            `extraData=${extraData}`,
            `message=${message}`,
            `orderId=${orderId}`,
            `orderInfo=${orderInfo}`,
            `orderType=${orderType}`,
            `partnerCode=${partnerCode}`,
            `payType=${payType}`,
            `requestId=${requestId}`,
            `responseTime=${responseTime}`,
            `resultCode=${resultCode}`,
            `transId=${transId}`,
        ].join('&');

        const correctSignature = createHmacString(rawSignature, secretKey);
        return correctSignature === signature;
    }

    async capturePayment(requestId, orderId, amount) {
        const partnerCode = config.MOMO_PARTNER_CODE;
        const accessKey = config.MOMO_ACCESS_KEY;
        const secretKey = config.MOMO_SECRET_KEY;
        const requestType = 'capture';
        const description = '';
        const lang = 'en';

        const rawSignature = [
            `accessKey=${accessKey}`,
            `amount=${amount}`,
            `description=${description}`,
            `orderId=${orderId}`,
            `partnerCode=${partnerCode}`,
            `requestId=${requestId}`,
            `requestType=${requestType}`,
        ].join('&');

        const signature = createHmacString(rawSignature, secretKey);

        const requestBody = {
            partnerCode: partnerCode,
            requestId: requestId,
            orderId: orderId,
            requestType: requestType,
            amount: amount,
            lang: lang,
            description: description,
            signature: signature,
        };

        try {
            const response = await axios.post(
                'https://test-payment.momo.vn:443/v2/gateway/api/confirm',
                requestBody,
            );

            const { data } = response;
        } catch (error) {
            console.error(error.response.data);
        }
    }

    getCurrency() {
        return config.currency.VND;
    }
}

module.exports = MomoCheckoutProvider;
