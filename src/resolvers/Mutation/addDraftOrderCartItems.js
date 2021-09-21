import { decodeAccountOpaqueId, decodeCartOpaqueId, decodeShopOpaqueId, decodeDraftOrderOpaqueId, decodeCartItemsOpaqueIds } from "../../xforms/id.js";

/**
 * @name Mutation/addDraftOrderCartItems
 * @method
 * @memberof DraftOrder/GraphQL
 * @summary resolver for the addDraftOrderCartItems GraphQL mutation
 * @param {Object} parentResult - unused
 * @param {Object} args.input - an object of all mutation arguments that were sent by the client
 * @param {String} args.input.cartId - the cart id
 * @param {String} args.input.cartToken - anonymous cart token if hasn't account assigned
 * @param {String} args.input.accountId - account id if has account assigned
 * @param {Array}  args.input.items - items to add into the cart
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} AddDraftOrderCartItemsPayload
 */
export default async function addDraftOrderCartItems(parentResult, { input }, context) {
    const { cartId: opaqueCartId, clientMutationId = null, items: itemsInput, cartToken, accountId: opaqueAccountId } = input;
    const cartId = decodeCartOpaqueId(opaqueCartId);
    const items = decodeCartItemsOpaqueIds(itemsInput);
    const accountId = decodeAccountOpaqueId(opaqueAccountId);

    const { 
        cart
    } = await context.mutations.addDraftOrderCartItems(context, {
        cartId,
        items,
        cartToken,
        accountId
    });
    return {
        cart,
        clientMutationId
    }
}