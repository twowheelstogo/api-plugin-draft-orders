/**
 * @method addDraftOrderCartItems
 * @summary - Method to add more items to existent cart
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - mutation input
 * @param {String} input.cartId - the cart id
 * @param {String} input.cartToken - anonymous cart token if hasn't account assigned
 * @param {String} input.accountId - account id if has account assigned
 * @param {Array}  input.items - items to add into the cart
 */
export default async function addDraftOrderCartItems(context, input) {
    
    if(input.accountId) {
        context.accountId = input.accountId;
    } else if(input.cartToken){
        context.accountId = null;
    }

    const udpatedCart = await context.mutations.addCartItems(context, input);

    return udpatedCart;
}