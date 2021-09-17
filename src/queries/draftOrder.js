import ReactionError from "@reactioncommerce/reaction-error";

/**
 * @method draftOrder
 * @summary get a single draft order
 * @param {Object} context - an object containing the per-request state
 * @param {Object} draftOrderId - id for a draft order
 * @returns {Promise<Object>} An object with `draftOrder`
 */
export default async function draftOrder(context, draftOrderId) {
    const { collections } = context;
    const { DraftOrders } = collections;

    if (!draftOrderId) throw new ReactionError("missing-param", "draftOrderId is required param");

    const draftOrder = await DraftOrders.findOne({ _id: draftOrderId });

    return draftOrder;
}
