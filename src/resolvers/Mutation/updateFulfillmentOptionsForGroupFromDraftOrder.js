import { decodeAccountOpaqueId, decodeCartOpaqueId, decodeFulfillmentGroupOpaqueId } from "../../xforms/id.js";

/**
 * @name Mutation/updateFulfillmentOptionsForGroupFromDraftOrder
 * @method
 * @memberof Cart/GraphQL
 * @summary resolver for the updateFulfillmentOptionsForGroupFromDraftOrder GraphQL mutation
 * @param {Object} parentResult - unused
 * @param {Object} args.input - an object of all mutation arguments that were sent by the client
 * @param {String} args.input.cartId - The ID of the cart to update fulfillment options for
 * @param {String} [args.input.cartToken] - The token for the cart, required if it is an anonymous cart
 * @param {String} args.input.fulfillmentGroupId - The group to update fulfillment options for
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {String} [args.input.accountId] - The account id
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} UpdateFulfillmentOptionsForGroupFromDraftOrderPayload
 */
export default async function updateFulfillmentOptionsForGroupFromDraftOrder(parentResult, { input }, context) {
  const { cartId: opaqueCartId, cartToken, clientMutationId = null, fulfillmentGroupId: opaqueFulfillmentGroupId, accountId: opaqueAccountId } = input;

  const fulfillmentGroupId = decodeFulfillmentGroupOpaqueId(opaqueFulfillmentGroupId);
  const cartId = decodeCartOpaqueId(opaqueCartId);
  const accountId = decodeAccountOpaqueId(opaqueAccountId);

  const updatedContext = context;

  if(accountId) updatedContext.accountId = accountId;

  const { cart } = await context.mutations.updateFulfillmentOptionsForGroup(updatedContext, {
    cartId,
    cartToken,
    fulfillmentGroupId
  });

  return {
    cart,
    clientMutationId
  };
}
