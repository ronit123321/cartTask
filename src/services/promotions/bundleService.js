const { promotions, PROMOTION_TYPE } = require("../../data/promotions");
const { convertToCustomFloat } = require("../../utils");

const getBundlePromotions = () =>
  promotions.filter((promotion) => promotion.type === PROMOTION_TYPE.BUNDLE);

const calculatePromotionalPrice = (item, promotion) => {
  const discount = convertToCustomFloat(
    Math.floor(item.quantity / promotion.condition.cartUnit) *
      item.product.price
  );

  const currentItemPrice = item.product.price * item.quantity;

  const promotionalItemPrice = convertToCustomFloat(
    (currentItemPrice - discount) / item.quantity
  );
  return promotionalItemPrice;
};

const applyBundlePromotions = (sessionCart) => {
  const bundlePromotions = getBundlePromotions();

  bundlePromotions.forEach((promotion) => {
    sessionCart.cartItems.forEach((item) => {
      if (item.product.id === promotion.productId) {
        item.product.price = calculatePromotionalPrice(item, promotion);
      }
    });
  });
};

module.exports = {
  applyBundlePromotions,
};
