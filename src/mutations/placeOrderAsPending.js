/**
 * @method placeDraftOrderAsPending
 * @summary Create a new draft order for a shop
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - an object of all mutation arguments that were sent by the client
 * @param {Object} input.order - The order input
 * @param {Object[]} input.payments - Payment info
 * @param {String} [input.clientMutationId] - An optional string identifying the mutation call
 * @param {String} [input.accountId] - The account id
 * @param {String} [input.draftOrderId] - The draft order id
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} An object with `draftOrder`
 */
export default async function placeDraftOrderAsPending(context, input) {
    const { collections } = context;
    const { DraftOrders } = collections;

    const { billing, giftNote, notes, draftOrderId, deliveryDate } = input;

    const date = new Date();

    const draftOrderInput = {
        shopId,
        updatedAt: date,
        status: "pending",
        billing,
        giftNote,
        notes,
        deliveryDate
    };

    if (deliveryDate) Object.assign(draftOrderInput, { status: "scheduled" });

    const modifier = { $set: draftOrderInput };

    const updatedOrder = await DraftOrders.findOneAndUpdate({ _id: draftOrderId }, modifier, { returnOriginal: false });

    return updatedOrder;
}
