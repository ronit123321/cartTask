const { PRODUCTID } = require("../data/productId");

const fetchProductById = (products, id) => {
  return products.find((product) => product.id === id);
};

const validateProductQuantity = (product, quantity) => {
  return product.quantity >= quantity;
};

const isMacbook = (id) => id === PRODUCTID.MacBookPro;

const getMacbookFromCart = (cart) =>
  cart.cartItems.find((item) => item.product.id === PRODUCTID.MacBookPro);

const getGoogleHomeItemFromCart = (cart) =>
  cart.cartItems.find((item) => item.product.id === PRODUCTID.GoogleHome);

const convertToCustomFloat = (value) => parseFloat(value.toFixed(2));

const getAlexaItemFromCart = (cart) =>
  cart.cartItems.find((item) => item.product.id === PRODUCTID.AlexaSpeaker);

const getCurrentItem = (id, sessionCart) => {
  if (id === PRODUCTID.GoogleHome)
    return getGoogleHomeItemFromCart(sessionCart);
  if (id === PRODUCTID.MacBookPro) return getMacbookFromCart(sessionCart);
  if (id === PRODUCTID.AlexaSpeaker) return getAlexaItemFromCart(sessionCart);
};

module.exports = {
  isMacbook,
  fetchProductById,
  validateProductQuantity,
  getMacbookFromCart,
  getGoogleHomeItemFromCart,
  convertToCustomFloat,
  getAlexaItemFromCart,
  getCurrentItem,
};
