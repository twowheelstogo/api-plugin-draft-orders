import { decodeAccountOpaqueId, decodeCartOpaqueId, decodeDraftOrderOpaqueId, decodeShopOpaqueId } from "../../xforms/id.js";

/**
 * @name Mutation/updateDraftOrder
 * @method
 * @memberof DraftOrder/GraphQL
 * @summary resolver for the updateDraftOrder GraphQL mutation
 * @param {Object} parentResult - unused
 * @param {Object} args.input - an object of all mutation arguments that were sent by the client
 * @param {Object} args.input.order - The order input
 * @param {Object[]} args.input.payments - Payment info
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {String} [args.input.draftOrderId] - The draft order id
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} UpdateDraftOrderPayload
 */
export default async function updateDraftOrder(parentResult, { input }, context) {
    const { clientMutationId = null,
        shopId: opaqueShopId,
        billing,
        giftNote,
        notes,
        deliveryDate,
        draftOrderId: opaqueDraftOrderId
    } = input;

    const shopId = decodeShopOpaqueId(opaqueShopId);
    const draftOrderId = decodeDraftOrderOpaqueId(opaqueDraftOrderId);

    const draftOrder = await context.mutations.updateDraftOrder(context, {
        draftOrderId,
        shopId,
        billing,
        giftNote,
        notes,
        deliveryDate
    });

    return { draftOrder, clientMutationId };
}