const { getCurrentItem } = require("../utils");

const { promotions } = require("../data/promotions");

const applyPromotions = (sessionCart) => {
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
