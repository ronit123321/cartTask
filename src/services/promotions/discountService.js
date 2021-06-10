const { promotions, PROMOTION_TYPE } = require("../../data/promotions");
const { convertToCustomFloat } = require("../../utils");

const getDiscountPromotions = () =>
  promotions.filter((promotion) => promotion.type === PROMOTION_TYPE.DISCOUNT);

const calculatePromotionPrice = (item, promotion) => {
  const totalCost = item.product.price * item.quantity;

  const discount = convertToCustomFloat(
    totalCost * (promotion.condition.offerCondition / 100)
  );

  const promotionalItemPrice = convertToCustomFloat(
    (totalCost - discount) / item.quantity
  );
  return promotionalItemPrice;
};

const applyDiscountPromotions = (sessionCart) => {
  const discountPromotions = getDiscountPromotions();

  discountPromotions.forEach((promotion) => {
    sessionCart.cartItems.forEach((item) => {
      if (item.product.id === promotion.productId) {
        if (item.quantity > promotion.condition.cartUnit) {
          item.product.price = calculatePromotionPrice(item, promotion);
        }
      }
    });
  });
};

module.exports = {
  applyDiscountPromotions,
};
