import Random from "@reactioncommerce/random";
import getOrderIdSequence from "../utils/getOrderIdSequence.js";

/**
 * @method placeDraftOrder
 * @summary Create a new draft order for a shop
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - mutation input
 * @param {String} input.shopId - shop id for the draft order
 * @param {String} input.draftOrder.cartId id for the cart
 * @param {String} input.draftOrder.cartToken token for the cart
 * @param {String} input.draftOrder.accountId account id for the cart
 * @returns {Promise<Object>} An object with `draftOrder`
 */
export default async function placeDraftOrder(context, input) {
    const { collections } = context;
    const { DraftOrders } = collections;

    const { draftOrder, shopId } = input;

    console.log("input", input)

    const date = new Date();

    const referenceId = await getOrderIdSequence(context);

    const draftOrderInput = {
        ...draftOrder,
        referenceId,
        _id: Random.id(),
        shopId,
        createdAt: date,
        status: "created",
        orderId: null,
        billing: null,
        giftNote: null,
        notes: null,
        deliveryDate: null
    };

    await DraftOrders.insertOne(draftOrderInput);

    return draftOrderInput;
}
