import ReactionError from "@reactioncommerce/reaction-error";

/**
 * @method draftOrder
 * @summary get a single draft order
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - input for draft order query
 * @param {String} input.draftOrderId - id for a draft order
 * @returns {Promise<Object>} An object with `draftOrder`
 */
export default async function draftOrder(context, { draftOrderId }) {
    const { collections } = context;
    const { DraftOrders } = collections;

    if (!draftOrderId) throw new ReactionError("missing-param", "draftOrderId is required param");

    return DraftOrders.findOne({ _id: draftOrderId });
}
