import ReactionError from "@reactioncommerce/reaction-error";

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
    const { createCartInput, accountId = null, draftOrderId } = input;

    const updatedContext = { ...context };

    updatedContext.accountId = accountId;

    console.log(input.accountId, accountId);

    const { cart, token } = await context.mutations.createCart(updatedContext, createCartInput);

    const draftOrder = {
        cartId: cart._id,
        cartToken: token || null,
        accountId
    };

    const modifier = { $set: draftOrder };

    const { value: updatedOrder } = await DraftOrders.findOneAndUpdate({
        _id: draftOrderId
    }, modifier, { returnOriginal: false });

    if (!updatedOrder) throw new ReactionError("not-found", "draft order not found");

    return updatedOrder;
}
