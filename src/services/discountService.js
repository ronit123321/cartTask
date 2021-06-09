const { PRODUCTID } = require("../data/productId");
const { getSessionProducts } = require("../services/productService");
const {
  getRasBerryPiFromProducts,

  convertToCustomFloat,
} = require("../utils");

const applyAlexaDiscount = (sessionCart, alexaItem) => {
  const alexaTotalCost = alexaItem.product.price * alexaItem.quantity;
  const discount = convertToCustomFloat(alexaTotalCost * 0.1);

  const promotionalItemPrice = convertToCustomFloat(
    (alexaTotalCost - discount) / alexaItem.quantity
  );
  sessionCart.cartItems.forEach((item) => {
    if (item.product.id === PRODUCTID.AlexaSpeaker)
      item.product.price = promotionalItemPrice;
  });
};

const applyMacbookDiscount = (sessionCart, macbookItem) => {
  const products = getSessionProducts();
  let rasBerryPiInventory = getRasBerryPiFromProducts(products);
  rasBerryPiInventory.price = 0;
  const maxStock = rasBerryPiInventory.quantity;
  const quantityToAdd =
    macbookItem.quantity <= maxStock ? macbookItem.quantity : maxStock;
  sessionCart.cartItems.push({
    product: rasBerryPiInventory,
    quantity: quantityToAdd,
  });
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
  applyMacbookDiscount,
  applyGoogleHomeDiscount,
};
