const { initialCart } = require("../data/initialState");

var _ = require("lodash");

var cart = _.cloneDeep(initialCart);

const getCartItemIdex = (product) =>
  cart.cartItems.findIndex((item) => item.product.id === product.id);

const getUserCart = () => {
  return { ...cart };
};

const addProductToUserCart = (product, quantity) => {
  const cartItemIndex = getCartItemIdex(product);
  if (cartItemIndex > -1) {
    cart.cartItems[cartItemIndex].quantity += quantity;
  } else {
    cart.cartItems.push({
      product,
      quantity,
    });
  }
  return { ...cart };
};

const removeProductFromUserCart = (product, quantity) => {
  const cartItemIndex = getCartItemIdex(product);
  if (cartItemIndex > -1) {
    cart.cartItems[cartItemIndex].quantity -= quantity;
  }
  return { ...cart };
};

const resetUserCart = () => {
  cart = _.cloneDeep(initialCart);
};

module.exports = {
  getUserCart,
  addProductToUserCart,
  removeProductFromUserCart,
  resetUserCart,
};
