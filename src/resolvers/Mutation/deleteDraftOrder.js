import { decodeAccountOpaqueId, decodeCartOpaqueId, decodeDraftOrderOpaqueId, decodeShopOpaqueId } from "../../xforms/id.js";

/**
 * @name Mutation/deleteDraftOrder
 * @method
 * @memberof DraftOrder/GraphQL
 * @summary resolver for the deleteDraftOrder GraphQL mutation
 * @param {Object} parentResult - unused
 * @param {Object} args.input - an object of all mutation arguments that were sent by the client
 * @param {String} args.input.draftOrderId - the draft order id to delete
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} DeleteDraftOrderPayload
 */
export default async function deleteDraftOrder(parentResult, { input }, context) {
    const { clientMutationId = null,
        draftOrderId: opaqueDraftOrderId
    } = input;

    const draftOrderId = decodeDraftOrderOpaqueId(opaqueDraftOrderId);

    const draftOrder = await context.mutations.deleteDraftOrder(context, {
        draftOrderId
    });

    return { draftOrder, clientMutationId };
}