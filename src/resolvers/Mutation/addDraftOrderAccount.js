import { decodeAccountOpaqueId, decodeCartOpaqueId, decodeShopOpaqueId, decodeDraftOrderOpaqueId } from "../../xforms/id.js";

/**
 * @name Mutation/addDraftOrderAccount
 * @method
 * @memberof DraftOrder/GraphQL
 * @summary resolver for the addDraftOrderAccount GraphQL mutation
 * @param {Object} parentResult - unused
 * @param {Object} args.input - an object of all mutation arguments that were sent by the client
 * @param {String} args.input.accountId - account id for the draft order
 * @param {String} args.input.cartId - cart id for the cart to update
 * @param {String} args.input.cartToken - token for the cart
 * @param {String} args.input.shopId - shop id related with the current draft order
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} AddDraftOrderAccountPayload
 */
export default async function addDraftOrderAccount(parentResult, { input }, context) {
    const {
        clientMutationId = null,
        accountId: opaqueAccountId,
        cartId: opaqueCartId,
        cartToken,
        shopId: opaqueShopId,
        draftOrderId: opaqueDraftOrderId
    } = input;
    const accountId = decodeAccountOpaqueId(opaqueAccountId);
    const cartId = decodeCartOpaqueId(opaqueCartId);
    const shopId = decodeShopOpaqueId(opaqueShopId);
    const draftOrderId = decodeDraftOrderOpaqueId(opaqueDraftOrderId);

    const draftOrder = await context.mutations.addDraftOrderAccount(context, {
        accountId,
        cartId,
        cartToken,
        shopId,
        draftOrderId
    });

    return { draftOrder, clientMutationId };
}