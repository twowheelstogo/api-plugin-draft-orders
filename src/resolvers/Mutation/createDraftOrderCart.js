import { decodeAccountOpaqueId, decodeDraftOrderOpaqueId, decodeCartItemsOpaqueIds, decodeShopOpaqueId } from "../../xforms/id.js";

/**
 * @name Mutation/createDraftOrderCart
 * @method
 * @memberof DraftOrder/GraphQL
 * @summary resolver for the createDraftOrderCart GraphQL mutation
 * @param {Object} parentResult - unused
 * @param {Object} args.input - an object of all mutation arguments that were sent by the client
 * @param {String} args.input.createCartInput - input for the cart to create
 * @param {String} args.input.accountId - account id for the draft order
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} CreateDraftOrderCartPayload
 */
export default async function createDraftOrderCart(parentResult, { input }, context) {
    const {
        clientMutationId = null,
        createCartInput: { items: itemsInput },
        accountId: opaqueAccountId,
        draftOrderId: opaqueDraftOrderId,
        shopId: opaqueShopId
    } = input;
    
    const accountId = decodeAccountOpaqueId(opaqueAccountId);
    const draftOrderId = decodeDraftOrderOpaqueId(opaqueDraftOrderId);
    const items = decodeCartItemsOpaqueIds(itemsInput);
    const shopId = decodeShopOpaqueId(opaqueShopId);

    const draftOrder = await context.mutations.createDraftOrderCart(context, {
        accountId,
        draftOrderId,
        shopId,
        createCartInput: {
            items,
            shopId
        }
    });

    return { draftOrder, clientMutationId };
}