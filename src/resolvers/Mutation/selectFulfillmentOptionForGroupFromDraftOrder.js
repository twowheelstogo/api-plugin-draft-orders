import { decodeAccountOpaqueId, decodeCartOpaqueId, decodeFulfillmentGroupOpaqueId, decodeFulfillmentMethodOpaqueId } from "../../xforms/id.js";

/**
 * @name Mutation/selectFulfillmentOptionForGroupFromDraftOrder
 * @method
 * @memberof Cart/GraphQL
 * @summary resolver for the selectFulfillmentOptionForGroupFromDraftOrder GraphQL mutation
 * @param {Object} parentResult - unused
 * @param {Object} args.input - an object of all mutation arguments that were sent by the client
 * @param {String} args.input.cartId - The ID of the cart to select a fulfillment option for
 * @param {String} [args.input.cartToken] - The token for the cart, required if it is an anonymous cart
 * @param {String} args.input.fulfillmentGroupId - The group to select a fulfillment option for
 * @param {String} args.input.fulfillmentMethodId - The fulfillment method ID from the option the shopper selected
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} selectFulfillmentOptionForGroupFromDraftOrderPayload
 */
export default async function selectFulfillmentOptionForGroupFromDraftOrder(parentResult, { input }, context) {
    const {
        cartId: opaqueCartId,
        cartToken,
        clientMutationId = null,
        fulfillmentGroupId: opaqueFulfillmentGroupId,
        fulfillmentMethodId: opaqueFulfillmentMethodId,
        accountId: opaqueAccountId
    } = input;

    const cartId = decodeCartOpaqueId(opaqueCartId);
    const fulfillmentGroupId = decodeFulfillmentGroupOpaqueId(opaqueFulfillmentGroupId);
    const fulfillmentMethodId = decodeFulfillmentMethodOpaqueId(opaqueFulfillmentMethodId);
    const accountId = decodeAccountOpaqueId(opaqueAccountId);

    const updatedContext = context;

    Object.assign(updatedContext, { accountId, userId: accountId });

    const { cart } = await context.mutations.selectFulfillmentOptionForGroup(updatedContext, {
        cartId,
        cartToken,
        fulfillmentGroupId,
        fulfillmentMethodId
    });

    return {
        cart,
        clientMutationId
    };
}
