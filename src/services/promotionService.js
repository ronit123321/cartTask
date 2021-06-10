const {
  applyBundlePromotions,
  applyDiscountPromotions,
  applyFreebiePromotions,
} = require("./promotions");

const applyPromotions = (sessionCart) => {
  applyBundlePromotions(sessionCart);
  applyDiscountPromotions(sessionCart);
  applyFreebiePromotions(sessionCart);
  return sessionCart;
};

module.exports = {
  applyPromotions,
};
