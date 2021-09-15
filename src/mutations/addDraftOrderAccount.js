
/**
 * @method addDraftOrderAccount
 * @summary Create a new cart into the draft order
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - mutation input
 * @param {String} input.accountId - account id for the cart
 * @param {String} input.cartId - cart id to reconcile
 * @param {String} input.cartToken - cart token
 * @param {String} input.shopId - shop id for the cart
 * @returns {Promise<Object>} An object with `draftOrder`
 */
export default async function addDraftOrderAccount(context, input) {
    const { collections } = context;
    const { DraftOrders } = collections;
    const { accountId, cartId, cartToken, shopId } = input;

    const draftOrder = {
        accountId,
        cartToken
    }

    const updatedContext = { ...context };

    updatedContext.accountId = accountId;

    if (cartId) {
        await context.mutations.reconcileCarts(updatedContext, {
            anonymousCartId: cartId,
            cartToken,
            shopId
        });

        delete draftOrder.cartToken;
    }

    const modifier = { $set: draftOrder };

    const { value: updatedDraftOrder } = await DraftOrders.findOneAndUpdate(
        {
            _id: cartId
        },
        modifier,
        {
            returnOriginal: false
        });

    return updatedDraftOrder;
}
