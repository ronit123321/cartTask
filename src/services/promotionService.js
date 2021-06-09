const {
  getMacbookFromCart,
  getGoogleHomeItemFromCart,
  getAlexaItemFromCart,
} = require("../utils");
const {
  applyMacbookDiscount,
  applyAlexaDiscount,
  applyGoogleHomeDiscount,
} = require("../services/discountService");

const applyPromotions = (sessionCart) => {
  applyMacbookPromotion(sessionCart);
  applyGoogleHomePromotion(sessionCart);
  applyAlexaSpeakerPromotion(sessionCart);
  return sessionCart;
};

const applyMacbookPromotion = (sessionCart) => {
  const macbookItem = getMacbookFromCart(sessionCart);
  if (macbookItem) applyMacbookDiscount(sessionCart, macbookItem);
};

const applyGoogleHomePromotion = (sessionCart) => {
  const googleHomeItem = getGoogleHomeItemFromCart(sessionCart);
  if (googleHomeItem) applyGoogleHomeDiscount(sessionCart, googleHomeItem);
};

const applyAlexaSpeakerPromotion = (sessionCart) => {
  const alexaItem = getAlexaItemFromCart(sessionCart);
  if (alexaItem && alexaItem.quantity > 3)
    applyAlexaDiscount(sessionCart, alexaItem);
};

module.exports = {
  applyPromotions,
};
