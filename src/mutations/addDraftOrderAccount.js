import ReactionError from "@reactioncommerce/reaction-error";

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
    const { accountId, cartId, cartToken, shopId, draftOrderId } = input;

    const draftOrder = {
        accountId,
        cartToken,
        cartId
    }

    const updatedContext = { ...context };

    updatedContext.accountId = accountId;

    if (cartId) {

        const { data: updatedCart } = await context.mutations.reconcileCarts(updatedContext, {
            anonymousCartId: cartId,
            cartToken,
            shopId
        });
        draftOrder.cartId = updatedCart._id;
    }

    const modifier = { $set: draftOrder };

    const { value: updatedDraftOrder } = await DraftOrders.findOneAndUpdate(
        {
            _id: draftOrderId
        },
        modifier,
        {
            returnOriginal: false
        });

    if (!updatedDraftOrder) throw new ReactionError("not-found", "draft order not found");

    return updatedDraftOrder;
}
