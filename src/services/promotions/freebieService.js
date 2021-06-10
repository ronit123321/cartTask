const { promotions, PROMOTION_TYPE } = require("../../data/promotions");
const { getFreebieFromProducts } = require("../../utils");
const { getSessionProducts } = require("../productService");

const getFreebiePromotions = () =>
  promotions.filter((promotion) => promotion.type === PROMOTION_TYPE.FREEBIE);

const applyFreebiePromotions = (sessionCart) => {
  const freebiePromotions = getFreebiePromotions();
  freebiePromotions.forEach((promotion) => {
    sessionCart.cartItems.forEach((item) => {
      if (item.product.id === promotion.productId) {
        const products = getSessionProducts();

        let freeBieQuantityInInventory = getFreebieFromProducts(
          products,
          promotion.condition.productId
        );
        freeBieQuantityInInventory.price = 0;

        const maxStock = freeBieQuantityInInventory.quantity;

        const quantityToAdd =
          item.quantity <= maxStock ? item.quantity : maxStock;

        sessionCart.cartItems.push({
          product: freeBieQuantityInInventory,
          quantity: quantityToAdd,
        });
      }
    });
  });
};

module.exports = {
  applyFreebiePromotions,
};
