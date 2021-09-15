import { decodeAccountOpaqueId, decodeCartOpaqueId, decodeShopOpaqueId } from "../../xforms/id.js";

/**
 * @name Mutation/placeDraftOrder
 * @method
 * @memberof DraftOrder/GraphQL
 * @summary resolver for the placeDraftOrder GraphQL mutation
 * @param {Object} parentResult - unused
 * @param {Object} args.input - an object of all mutation arguments that were sent by the client
 * @param {String} args.input.shopId - shop id for the draft order
 * @param {String} args.input.draftOrder.cartId id for the cart
 * @param {String} args.input.draftOrder.cartToken token for the cart
 * @param {String} args.input.draftOrder.accountId account id for the cart
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} PlaceDraftOrderPayload
 */
export default async function placeDraftOrder(parentResult, { input }, context) {
    const { clientMutationId = null,
        draftOrder: {
            shopId: opaqueShopId, cartId: opaqueCartId, cartToken, accountId: opaqueAccountId
        }
    } = input;
    
    const shopId = decodeShopOpaqueId(opaqueShopId);
    const cartId = decodeCartOpaqueId(opaqueCartId);
    const accountId = decodeAccountOpaqueId(opaqueAccountId);

    const draftOrder = await context.mutations.placeDraftOrder(context, {
        draftOrder: {
            cartId,
            cartToken,
            accountId
        },
        shopId
    });

    return { draftOrder, clientMutationId };
}