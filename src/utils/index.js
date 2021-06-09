const { PRODUCTID } = require("../data/productId");

const findAndValidateByProductId = (products, id) => {
  return products.find((product) => product.id === id);
};

const validateProductQuantity = (product, quantity) => {
  return product.quantity >= quantity;
};

const isMacbook = (id) => id === PRODUCTID.MacBookPro;

const getMacbookFromCart = (cart) =>
  cart.cartItems.find((item) => item.product.id === PRODUCTID.MacBookPro);

const getRasBerryPiFromProducts = (products) =>
  products.find((product) => product.id === PRODUCTID.RaspberryPiB);

const getGoogleHomeItemFromCart = (cart) =>
  cart.cartItems.find((item) => item.product.id === PRODUCTID.GoogleHome);

const convertToCustomFloat = (value) => parseFloat(value.toFixed(2));

const getAlexaItemFromCart = (cart) =>
  cart.cartItems.find((item) => item.product.id === PRODUCTID.AlexaSpeaker);

module.exports = {
  isMacbook,
  findAndValidateByProductId,
  validateProductQuantity,
  getMacbookFromCart,
  getRasBerryPiFromProducts,
  getGoogleHomeItemFromCart,
  convertToCustomFloat,
  getAlexaItemFromCart
};
