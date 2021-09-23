import { decodeCartOpaqueId, decodeFulfillmentGroupOpaqueId, decodeAccountOpaqueId } from "../../xforms/id.js";

/**
 * @name Mutation/updateFulfillmentTypeForGroupFromDraftOrder
 * @method
 * @memberof Cart/GraphQL
 * @summary resolver for the updateFulfillmentTypeForGroupFromDraftOrder GraphQL mutation
 * @param {Object} parentResult - unused
 * @param {Object} args.input - an object of all mutation arguments that were sent by the client
 * @param {String} args.input.cartId - The ID of the cart to update fulfillment options for
 * @param {String} [args.input.cartToken] - The token for the cart, required if it is an anonymous cart
 * @param {String} args.input.fulfillmentGroupId - The group to update fulfillment options for
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {String} [args.input.accountId] - The account id
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} UpdateFulfillmentOptionsForGroupPayload
 */
export default async function updateFulfillmentTypeForGroupFromDraftOrder(parentResult, { input }, context) {
    const { cartId: opaqueCartId, cartToken, clientMutationId = null, fulfillmentGroupId: opaqueFulfillmentGroupId, fulfillmentType, accountId: opaqueAccountId } = input;

    const fulfillmentGroupId = decodeFulfillmentGroupOpaqueId(opaqueFulfillmentGroupId);
    const cartId = decodeCartOpaqueId(opaqueCartId);
    const accountId = decodeAccountOpaqueId(opaqueAccountId);
    const updatedContext = context;
    Object.assign(updatedContext, { accountId });

    const { cart } = await context.mutations.updateFulfillmentTypeForGroup(updatedContext, {
        cartId,
        cartToken,
        fulfillmentGroupId,
        fulfillmentType
    });

    return {
        cart,
        clientMutationId
    };
}