const { PRODUCTID } = require("../data/productId");
const { getSessionProducts } = require("../services/productService");
const {
  // getRasBerryPiFromProducts,
  convertToCustomFloat,
} = require("../utils");

const applyAlexaDiscount = (sessionCart, alexaItem) => {
  if (alexaItem.quantity > 3) {
    const alexaTotalCost = alexaItem.product.price * alexaItem.quantity;
    const discount = convertToCustomFloat(alexaTotalCost * 0.1);

    const promotionalItemPrice = convertToCustomFloat(
      (alexaTotalCost - discount) / alexaItem.quantity
    );
    sessionCart.cartItems.forEach((item) => {
      if (item.product.id === PRODUCTID.AlexaSpeaker)
        item.product.price = promotionalItemPrice;
    });
  }
};

const applyGoogleHomeDiscount = (sessionCart, googleHomeItem) => {
  const discount = convertToCustomFloat(
    Math.floor(googleHomeItem.quantity / 3) * googleHomeItem.product.price
  );
  const currentGoogleHomePrice =
    googleHomeItem.product.price * googleHomeItem.quantity;
  const promotionalItemPrice = convertToCustomFloat(
    (currentGoogleHomePrice - discount) / googleHomeItem.quantity
  );
  sessionCart.cartItems.forEach((item) => {
    if (item.product.id === PRODUCTID.GoogleHome)
      item.product.price = promotionalItemPrice;
  });
};

module.exports = {
  applyAlexaDiscount,
  applyGoogleHomeDiscount,
};
