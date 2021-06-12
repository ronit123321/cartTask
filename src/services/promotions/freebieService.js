const { promotions, PROMOTION_TYPE } = require("../../data/promotions");
const { fetchProductById } = require("../../utils");
const { getSessionProducts } = require("../productService");

const getFreebiePromotions = () =>
  promotions.filter((promotion) => promotion.type === PROMOTION_TYPE.FREEBIE);

const getFreebieItemToAdd = (products, promotion, item) => {
  let freeBieQuantityInInventory = fetchProductById(
    products,
    promotion.condition.productId
  );
  freeBieQuantityInInventory.price = 0;

  const maxStock = freeBieQuantityInInventory.quantity;

  const quantityToAdd = item.quantity <= maxStock ? item.quantity : maxStock;
  return { freeBieQuantityInInventory, quantityToAdd };
};

const applyFreebiePromotions = (sessionCart) => {
  const freebiePromotions = getFreebiePromotions();
  freebiePromotions.forEach((promotion) => {
    sessionCart.cartItems.forEach((item) => {
      if (item.product.id === promotion.productId) {
        const products = getSessionProducts();

        const { freeBieQuantityInInventory, quantityToAdd } =
          getFreebieItemToAdd(products, promotion, item);

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
