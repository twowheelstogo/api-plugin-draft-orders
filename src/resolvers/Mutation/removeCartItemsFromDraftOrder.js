import { decodeCartItemOpaqueId, decodeCartOpaqueId, decodeAccountOpaqueId } from "../../xforms/id.js";

/**
 * @name Mutation/removeCartItemsFromDraftOrder
 * @method
 * @memberof Cart/GraphQL
 * @summary resolver for the removeCartItemsFromDraftOrder GraphQL mutation
 * @param {Object} parentResult - unused
 * @param {Object} args.input - an object of all mutation arguments that were sent by the client
 * @param {String} args.input.cartId - The ID of the cart in which all of the items exist
 * @param {String[]} args.input.cartItemIds - Array of item IDs to update
 * @param {String} args.input.cartToken - The cartToken if the cart is an anonymous cart
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} removeCartItemsFromDraftOrderPayload
 */
export default async function removeCartItemsFromDraftOrder(parentResult, { input }, context) {
    const { cartId: opaqueCartId, clientMutationId = null, cartItemIds: opaqueCartItemIds, cartToken, accountId: opaqueAccountId } = input;

    const cartId = decodeCartOpaqueId(opaqueCartId);
    const cartItemIds = opaqueCartItemIds.map(decodeCartItemOpaqueId);
    const accountId = decodeAccountOpaqueId(opaqueAccountId);

    const updatedContext = context;

    if (accountId) {
        Object.assign(updatedContext, { accountId });
    }

    const { cart } = await context.mutations.removeCartItems(updatedContext, {
        cartId,
        cartItemIds,
        cartToken
    });

    return {
        cart,
        clientMutationId
    };
}
