import { decodeDraftOrderOpaqueId } from "../../xforms/id.js";

/**
 * @name Query/draftOrder
 * @method
 * @memberof DraftOrder/Query
 * @summary query the DraftOrders collection for a single order
 * @param {Object} _ - unused
 * @param {Object} args - an object of all arguments that were sent by the client
 * @param {String} args.draftOrderId - draftOrder id
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} DraftOrder
 */
export default async function draftOrder(_, args, context) {
  const {
    draftOrderId: opaquedraftOrderId
  } = args;

  const draftOrderId = decodeDraftOrderOpaqueId(opaquedraftOrderId);

  return context.queries.draftOrder(context, {
    draftOrderId
  });
}
