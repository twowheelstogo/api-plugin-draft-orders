
/**
 * @method setShippingAddressFromDraftOrder
 * @summary sets a shipping address on cart from draft order
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - an object of all mutation arguments that were sent by the client
 * @param {Object} input.address - the shipping address
 * @param {String} input.addressId - If set, this will be saved as the Address._id. Otherwise an ID will be generated.
 * @param {String} input.cartId - The cart to set shipping address on
 * @param {String} input.cartToken - The token for the cart, required if it is an anonymous cart
 * @param {String} input.accountId - The account id
 */
export default async function setShippingAddressFromDraftOrder(context, input) {
    const updatedContext = context;

    if (input.accountId) {
        updatedContext.accountId = input.accountId;
        delete input.accountId;
    }

    const cart = await context.mutations.setShippingAddressOnCart(updatedContext, input);

    return cart;
}