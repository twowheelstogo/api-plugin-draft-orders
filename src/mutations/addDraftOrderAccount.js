import ReactionError from "@reactioncommerce/reaction-error";

/**
 * @method addDraftOrderAccount
 * @summary Create a new cart into the draft order
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - mutation input
 * @param {String} input.accountId - account id for the cart
 * @param {String} input.cartId - cart id to reconcile
 * @param {String} input.cartToken - cart token
 * @param {String} input.shopId - shop id for the cart
 * @returns {Promise<Object>} An object with `draftOrder`
 */
export default async function addDraftOrderAccount(context, input) {
    const { collections } = context;
    const { DraftOrders, Cart } = collections;
    const { accountId, cartId, cartToken, shopId, draftOrderId } = input;

    const draftOrder = {
        accountId,
        cartToken,
        cartId
    }

    const updatedContext = { ...context };

    updatedContext.accountId = accountId;

    if (cartId) {

        // const { cart: updatedCart } = await context.mutations.reconcileCarts(updatedContext, {
        //     anonymousCartId: cartId,
        //     cartToken,
        //     shopId
        // });
        const filter = {
            _id: cartId
        };

        const cartInput = {
            accountId
        };

        if (cartToken) {
            cartInput.anonymousAccessToken = null;
        }

        const cartModifier = { $set: cartInput };

        const exists = await Cart.findOne({ accountId, shopId });

        if (exists) throw new ReactionError("cart-found", "Each account may have only one cart per shop at a time");

        const { value: updatedCart } = await Cart.findOneAndUpdate(filter, cartModifier, {
            returnOriginal: false
        });

        if (!updatedCart) throw new ReactionError("not-found", `cart with ID ${cartId} not found`);

        draftOrder.cartId = updatedCart._id;
    }

    const modifier = { $set: draftOrder };

    const { value: updatedDraftOrder } = await DraftOrders.findOneAndUpdate(
        {
            _id: draftOrderId
        },
        modifier,
        {
            returnOriginal: false
        });

    if (!updatedDraftOrder) throw new ReactionError("not-found", "draft order not found");

    return updatedDraftOrder;
}
