import decodeOpaqueIdForNamespace from "@reactioncommerce/api-utils/decodeOpaqueIdForNamespace.js";
import encodeOpaqueId from "@reactioncommerce/api-utils/encodeOpaqueId.js";

const namespaces = {
  Account: "reaction/account",
  Address: "reaction/address",
  Cart: "reaction/cart",
  CartItem: "reaction/cartItem",
  FulfillmentGroup: "reaction/fulfillmentGroup",
  FulfillmentMethod: "reaction/fulfillmentMethod",
  Product: "reaction/product",
  Shop: "reaction/shop",
  DraftOrder: "reaction/draftOrder",
  Order: "reaction/order"
};

export const encodeAccountOpaqueId = encodeOpaqueId(namespaces.Account);
export const encodeAddressOpaqueId = encodeOpaqueId(namespaces.Address);
export const encodeCartItemOpaqueId = encodeOpaqueId(namespaces.CartItem);
export const encodeCartOpaqueId = encodeOpaqueId(namespaces.Cart);
export const encodeFulfillmentGroupOpaqueId = encodeOpaqueId(namespaces.FulfillmentGroup);
export const encodeShopOpaqueId = encodeOpaqueId(namespaces.Shop);
export const encondeDraftOrderOpaqueId = encodeOpaqueId(namespaces.DraftOrder);
export const encodeOrderOpaqueId = encodeOpaqueId(namespaces.Order);

export const decodeAccountOpaqueId = decodeOpaqueIdForNamespace(namespaces.Account);
export const decodeAddressOpaqueId = decodeOpaqueIdForNamespace(namespaces.Address);
export const decodeCartItemOpaqueId = decodeOpaqueIdForNamespace(namespaces.CartItem);
export const decodeCartOpaqueId = decodeOpaqueIdForNamespace(namespaces.Cart);
export const decodeFulfillmentGroupOpaqueId = decodeOpaqueIdForNamespace(namespaces.FulfillmentGroup);
export const decodeFulfillmentMethodOpaqueId = decodeOpaqueIdForNamespace(namespaces.FulfillmentMethod);
export const decodeProductOpaqueId = decodeOpaqueIdForNamespace(namespaces.Product);
export const decodeShopOpaqueId = decodeOpaqueIdForNamespace(namespaces.Shop);
export const decodeDraftOrderOpaqueId = decodeOpaqueIdForNamespace(namespaces.DraftOrder);
export const decodeOrderOpaqueId = decodeOpaqueIdForNamespace(namespaces.Order);

/**
 * @param {Object[]} items Array of OrderItemInput
 * @returns {Object[]} Same array with all IDs transformed to internal
 */
 export function decodeOrderItemsOpaqueIds(items) {
  return items.map((item) => ({
    ...item,
    productConfiguration: {
      productId: decodeProductOpaqueId(item.productConfiguration.productId),
      productVariantId: decodeProductOpaqueId(item.productConfiguration.productVariantId)
    }
  }));
}

/**
 * @param {Object[]} items Array of CartItemInput
 * @returns {Object[]} Same array with all IDs transformed to internal
 */
export function decodeCartItemsOpaqueIds(items) {
  return items.map((item) => ({
    ...item,
    productConfiguration: {
      productId: decodeProductOpaqueId(item.productConfiguration.productId),
      productVariantId: decodeProductOpaqueId(item.productConfiguration.productVariantId)
    }
  }));
}
