const { getCurrentItem } = require("../utils");

const { promotions } = require("../data/promotions");

const {
  applyBundlePromotions,
  applyDiscountPromotions,
  applyFreebiePromotions,
} = require("./promotions");

const applyPromotions = (sessionCart) => {
  
  applyBundlePromotions(sessionCart);
  applyDiscountPromotions(sessionCart);
  applyFreebiePromotions(sessionCart);

  promotions.forEach((promotion) => {
    const currentItem = getCurrentItem(promotion.productId, sessionCart);
    if (currentItem) {
      promotion.offers.forEach((offer) => {
        offer(sessionCart, currentItem);
      });
    }
  });
  return sessionCart;
};

module.exports = {
  applyPromotions,
};
