import { encondeDraftOrderOpaqueId } from "../../xforms/id.js";

export default {
    _id: (node) => encondeDraftOrderOpaqueId(node._id),
    cartId: (node) => node.cartId,
    createdAt: (node) => node.createdAt,
    cartToken: (node) => node.cartToken,
    accountId: (node) => node.accountId,
    shopId: (node) => node.shopId
}