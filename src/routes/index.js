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

const { PRODUCTID } = require("../data/productId");

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

//Promotion item logic --- unable to move out and avoid cyclic dependencies
const applyMacbookPromotion = (quantity) => {
  //if less or equal to max stock
  const products = getSessionProducts();
  const maxStock = products.find(
    (product) => product.id === PRODUCTID.RaspberryPiB
  ).quantity;
  if (quantity <= maxStock) addProductToCart(PRODUCTID.RaspberryPiB, quantity);
  else {
    addProductToCart(PRODUCTID.RaspberryPiB, maxStock);
  }
};

const removeMacbookPromotion = (quantity) => {
  removeProductFromCart(PRODUCTID.RaspberryPiB, quantity);
};

module.exports = {
  getProducts,
  addProductToCart,
  resetRecords,
  removeProductFromCart,
  getCart,
  resetRecords,
};
