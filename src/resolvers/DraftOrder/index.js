import getAccount from "../../utils/getAccount.js";
import { encondeDraftOrderOpaqueId, encodeCartOpaqueId, encodeShopOpaqueId, encodeAccountOpaqueId } from "../../xforms/id.js";

export default {
    _id: (node) => encondeDraftOrderOpaqueId(node._id),
    cartId: (node) => encodeCartOpaqueId(node.cartId),
    createdAt: (node) => node.createdAt,
    cartToken: (node) => node.cartToken,
    accountId: (node) => encodeAccountOpaqueId(node.accountId),
    shopId: (node) => encodeShopOpaqueId(node.shopId),
    account: (node, __, ctx) => getAccount(ctx, node.accountId)
}