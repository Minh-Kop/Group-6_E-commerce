const sql = require('mssql/msnodesqlv8');

const database = require('../utils/database');

exports.createReview = async ({ bookId, orderId, rating, comment }) => {
    const pool = await database.getConnectionPool();
    const request = new sql.Request(pool);
    request.input('orderId', sql.Char, orderId);
    request.input('bookId', sql.Char, bookId);
    request.input('rating', sql.Int, rating);
    request.input('comment', sql.NVarChar, comment);
    const result = await request.execute('sp_CreateReview');
    return result.returnValue;
};

// export default {
//     async getReview({ productId, variantId, orderId }) {
//         const query = removeUndefined({
//             product_id: productId,
//             variant_id: variantId,
//             order_id: orderId,
//         });
//         const result = await db('review')
//             .join('product_variant', 'review.variant_id', 'product_variant.id')
//             .join('order', 'order.id', 'review.order_id')
//             .join('account', 'account.email', 'order.email')
//             .where(query)
//             .select(
//                 'account.email',
//                 'account.fullname',
//                 'account.avatar_path',
//                 'review.variant_id',
//                 'review.order_id',
//                 'review.rating',
//                 'review.comment',
//                 'review.created_time',
//             );
//         return result;
//     },
// };
