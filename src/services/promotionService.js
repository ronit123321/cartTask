const {
  getMacbookFromCart,
  getGoogleHomeItemFromCart,
  getAlexaItemFromCart,
} = require("../utils");

const { promotions } = require("../data/promotions");
const { PRODUCTID } = require("../data/productId");

const applyPromotions = (sessionCart) => {
  applyMacbookPromotion(sessionCart);
  applyGoogleHomePromotion(sessionCart);
  applyAlexaSpeakerPromotion(sessionCart);
  return sessionCart;
};

const applyMacbookPromotion = (sessionCart) => {
  const macbookItem = getMacbookFromCart(sessionCart);
  const macBookPromotions = promotions.find(
    (promotion) => promotion.productId === PRODUCTID.MacBookPro
  ).promotions;
  if (macbookItem && macBookPromotions.length > 0) {
    macBookPromotions.forEach((promotion) => {
      promotion(sessionCart, macbookItem);
    });
  }
};

const applyGoogleHomePromotion = (sessionCart) => {
  const googleHomeItem = getGoogleHomeItemFromCart(sessionCart);
  const googleHomePromotions = promotions.find(
    (promotion) => promotion.productId === PRODUCTID.GoogleHome
  ).promotions;
  if (googleHomeItem && googleHomePromotions.length > 0) {
    googleHomePromotions.forEach((promotion) => {
      promotion(sessionCart, googleHomeItem);
    });
  }
};

const applyAlexaSpeakerPromotion = (sessionCart) => {
  const alexaItem = getAlexaItemFromCart(sessionCart);
  const alexaPromotions = promotions.find(
    (promotion) => promotion.productId === PRODUCTID.AlexaSpeaker
  ).promotions;
  if (alexaItem && alexaItem.quantity > 3 && alexaPromotions.length > 0) {
    alexaPromotions.forEach((promotion) => {
      promotion(sessionCart, alexaItem);
    });
  }
};

module.exports = {
  applyPromotions,
};
