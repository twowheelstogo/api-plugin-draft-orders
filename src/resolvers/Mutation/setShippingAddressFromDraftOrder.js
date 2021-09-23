import { decodeAccountOpaqueId, decodeAddressOpaqueId, decodeCartOpaqueId } from "../../xforms/id.js";

/**
 * @name Mutation/setShippingAddressFromDraftOrder
 * @method
 * @memberof Cart/GraphQL
 * @summary resolver for the setShippingAddressFromDraftOrder GraphQL mutation
 * @param {Object} parentResult - unused
 * @param {Object} args.input - an object of all mutation arguments that were sent by the client
 * @param {Object} args.input.address - The shipping address
 * @param {String} [args.input.addressId] - If set, this will be saved as the Address._id. Otherwise an ID will be generated.
 * @param {String} args.input.cartId - The cart to set shipping address on
 * @param {String} [args.input.cartToken] - The token for the cart, required if it is an anonymous cart
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {String} [args.input.accountId] - The account id
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} SetShippingAddressFromDraftOrderPayload
 */
export default async function setShippingAddressFromDraftOrder(parentResult, { input }, context) {
    const { address, addressId: opaqueAddressId, cartId: opaqueCartId, cartToken, clientMutationId = null, accountId: opaqueAccountId } = input;

    const addressId = decodeAddressOpaqueId(opaqueAddressId);
    const cartId = decodeCartOpaqueId(opaqueCartId);
    const accountId = decodeAccountOpaqueId(opaqueAccountId);

    const { cart } = await context.mutations.setShippingAddressFromDraftOrder(context, {
        address,
        addressId,
        cartId,
        cartToken,
        accountId
    });

    return {
        cart,
        clientMutationId
    };
}
