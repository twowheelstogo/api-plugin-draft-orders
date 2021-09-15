
/**
 * @method createDraftOrderCart
 * @summary Create a new cart into the draft order
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - mutation input
 * @param {Object} input.createCartInput - input to create cart
 * @param {String} input.accountId - account id to create linked cart if exists
 * @returns {Promise<Object>} An object with `draftOrder`
 */
export default async function createDraftOrderCart(context, input) {
    const { collections } = context;
    const { DraftOrders } = collections;
    const { createCartInput, accountId } = input;

    const updatedContext = { ...context };

    updatedContext.accountId = accountId;

    const { cart, token } = await context.mutations.createCart(updatedContext, createCartInput);

    const draftOrder = {
        cartId: cart._id,
        cartToken: accountId && token || null
    };

    const updatedOrder = await DraftOrders.insertOne(draftOrder);

    return updatedOrder;
}
