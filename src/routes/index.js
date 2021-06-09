const {
  initialProduct,
  initialCart,
  PRODUCTID,
} = require("../data/initialState");

const {
  isMacbook,
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
  getUserCart,
  updateProductQuantityToCart,
  calculateCartPrice,
  resetCart,
} = require("../services/cartService");

var _ = require("lodash");

const resetRecords = () => {
  resetCart();
  resetProducts();
  return getCart();
};

const addProductToCart = (id, quantity) => {
  const products = getSessionProducts();
  const product = findAndValidateByProductId(products, id);
  if (product && validateProductQuantity(product, quantity)) {
    reduceProductQuantity(products, product.id, quantity);
    updateProductQuantityToCart(product, quantity);
    if (isMacbook(id)) applyMacbookPromotion(quantity);
    return calculateCartPrice();
  }
  // throw error later
  return getCart();
};

const removeProductFromCart = (id, quantity) => {
  const products = getSessionProducts();
  const product = findAndValidateByProductId(products, id);

  if (product && validateProductQuantity(product, quantity)) {
    increaseProductQuantity(product.id, quantity);
    updateProductQuantityToCart(product, quantity);
    if (isMacbook(id)) removeMacbookPromotion(quantity);
    return calculateCartPrice();
  }
  return { ...cart };
};

const getProducts = () => {
  return getSessionProducts();
};

const getCart = () => {
  return getUserCart();
};

//Logic

const applyMacbookPromotion = (quantity) => {
  //if less or equal to max stock
  const products = getSessionProducts();
  const maxStock = products.find((product) => product.id === 4).quantity;
  if (quantity <= maxStock) addProductToCart(4, quantity);
  else {
    addProductToCart(4, maxStock);
  }
};

const removeMacbookPromotion = (quantity) => {
  removeProductFromCart(4, quantity);
};

module.exports = {
  getProducts,
  addProductToCart,
  resetRecords,
  removeProductFromCart,
  getCart,
  resetRecords,
};
