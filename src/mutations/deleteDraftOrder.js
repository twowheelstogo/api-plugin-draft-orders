import ReactionError from "@reactioncommerce/reaction-error";

/**
 * @method deleteDraftOrder
 * @summary Create a new draft order for a shop
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - mutation input
 * @param {String} input.shopId - shop id for the draft order
 * @param {String} input.draftOrder.cartId id for the cart
 * @param {String} input.draftOrder.cartToken token for the cart
 * @param {String} input.draftOrder.accountId account id for the cart
 * @returns {Promise<Object>} An object with `draftOrder`
 */
export default async function deleteDraftOrder(context, input) {
    const { collections } = context;
    const { DraftOrders, Cart } = collections;

    const { draftOrderId } = input;

    const filter = { _id: draftOrderId };

    const draftOrder = await DraftOrders.findOne(filter);

    if (!draftOrder) throw new ReactionError("not-found", `draft order with id ${draftOrderId} not found`);

    if (draftOrder.cartId) {
        await Cart.deleteOne({ _id: draftOrder.cartId });
    }

    await DraftOrders.deleteOne(filter);

    return draftOrder;
}
