const {
  findAndValidateByProductId,
  validateProductQuantity,
} = require("../utils");

const {
  reduceProductQuantity,
  increaseProductQuantity,
  resetProducts,
  getSessionProducts,
} = require("../services/productService");

const {
  resetUserCart,
  addProductToUserCart,
  removeProductFromUserCart,
} = require("../services/userCartService");

const {
  resetSessionCart,
  getSessionCart,
  updateSessionCart,
} = require("../services/sessionCart");

const resetRecords = () => {
  resetUserCart();
  resetProducts();
  resetSessionCart();
};

const addProductToCart = (id, quantity) => {
  const products = getSessionProducts();
  const product = findAndValidateByProductId(products, id);
  if (product && validateProductQuantity(product, quantity)) {
    reduceProductQuantity(products, product.id, quantity);
    const usesrCart = addProductToUserCart(product, quantity);
    updateSessionCart(usesrCart);
  }
  return getSessionCart();
};

const removeProductFromCart = (id, quantity) => {
  const products = getSessionProducts();
  const product = findAndValidateByProductId(products, id);
  if (product && validateProductQuantity(product, quantity)) {
    increaseProductQuantity(product.id, quantity);
    const usesrCart = removeProductFromUserCart(product, quantity);
    updateSessionCart(usesrCart);
  }
  return getSessionCart();
};

const getProducts = () => {
  return getSessionProducts();
};

const getCart = () => {
  return getSessionCart();
};

module.exports = {
  getProducts,
  addProductToCart,
  resetRecords,
  removeProductFromCart,
  getCart,
  resetRecords,
};
