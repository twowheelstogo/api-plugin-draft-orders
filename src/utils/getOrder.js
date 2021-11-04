
/**
 * @method getOrder
 * @summary gets a single account by id
 * @param {context} - request context
 * @param {orderId} - the orderId
 * @returns {Promise<Object>} returns a single Account object
 */
 export default async function getOrder(context, orderId) {
    const { collections } = context;
    const { Orders } = collections;

    return Orders.findOne({ _id: orderId });
}