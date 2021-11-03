import {
    decodeCartOpaqueId,
    decodeFulfillmentMethodOpaqueId,
    decodeOrderItemsOpaqueIds,
    decodeShopOpaqueId,
    decodeAccountOpaqueId,
    decodeDraftOrderOpaqueId
} from "../../xforms/id.js";

/**
 * @name Mutation/placeOrderFromDraftOrder
 * @method
 * @memberof Payments/GraphQL
 * @summary resolver for the placeOrderFromDraftOrder GraphQL mutation
 * @param {Object} parentResult - unused
 * @param {Object} args.input - an object of all mutation arguments that were sent by the client
 * @param {Object} args.input.order - The order input
 * @param {Object[]} args.input.payments - Payment info
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {String} [args.input.accountId] - The account id
 * @param {String} [args.input.draftOrderId] - The draft order id
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} PlaceOrderFromDraftOrderPayload
 */
export default async function placeOrderFromDraftOrder(parentResult, { input }, context) {
    const { clientMutationId = null, order, payments, billing, giftNote, accountId: opaqueAccountId, draftOrderId: opaqueDraftOrderId } = input;
    const { cartId: opaqueCartId, fulfillmentGroups, shopId: opaqueShopId } = order;
    const { collections } = context;
    const { DraftOrders } = collections;

    const cartId = opaqueCartId ? decodeCartOpaqueId(opaqueCartId) : null;
    const shopId = decodeShopOpaqueId(opaqueShopId);
    const accountId = decodeAccountOpaqueId(opaqueAccountId);
    const draftOrderId = decodeDraftOrderOpaqueId(opaqueDraftOrderId);

    const updatedContext = context;

    Object.assign(updatedContext, { accountId, userId: accountId });

    const transformedFulfillmentGroups = fulfillmentGroups.map((group) => ({
        ...group,
        items: decodeOrderItemsOpaqueIds(group.items),
        selectedFulfillmentMethodId: decodeFulfillmentMethodOpaqueId(group.selectedFulfillmentMethodId),
        shopId: decodeShopOpaqueId(group.shopId)
    }));

    const { orders, token } = await context.mutations.placeOrder(updatedContext, {
        order: {
            ...order,
            cartId,
            fulfillmentGroups: transformedFulfillmentGroups,
            shopId
        },
        payments,
        billing,
        giftNote
    });

    if (orders && Array.isArray(orders)) {
        const selector = { $set: { orderId: orders[0]?._id, status: "processing" } };

        console.log("updating draft order...", draftOrderId);

        const result = await DraftOrders.findOneAndUpdate({ _id: draftOrderId }, selector, { returnOriginal: false });

        console.log(result);
    }

    return {
        clientMutationId,
        orders,
        token
    };
}
