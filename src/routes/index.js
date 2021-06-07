const {
  initialProduct,
  initialCart,
  PRODUCTID,
} = require("../data/initialState");
var _ = require("lodash");

let products = _.cloneDeep(initialProduct);

let cart = _.cloneDeep(initialCart);

const resetRecords = () => {
  products = _.cloneDeep(initialProduct);
  cart = _.cloneDeep(initialCart);
  return { ...cart };
};

const addProductToCart = (id, quantity) => {
  const product = findAndValidateByProductId(id);
  if (product && validateProductQuantity(product, quantity)) {
    reduceProductQuantity(product.id, quantity);
    updateProductQuantityToCart(product, quantity);
    if (isMacbook(id)) applyMacbookPromotion(quantity);
    calculateCartPrice();
  }

  return { ...cart };
};

const removeProductFromCart = (id, quantity) => {
  const product = findAndValidateByProductId(id);

  if (product && validateProductQuantity(product, quantity)) {
    increaseProductQuantity(product.id, quantity);
    updateProductQuantityToCart(product, quantity);
    if (isMacbook(id)) removeMacbookPromotion(quantity);
    calculateCartPrice();
  }
  return { ...cart };
};

const getProducts = () => {
  return [...products];
};

const getCart = () => {
  return { ...cart };
};

//Logic
const calculateCartPrice = () => {
  let actualTotalPrice = 0;
  cart.cartItems.forEach((item) => {
    actualTotalPrice += item.product.price * item.quantity;
  });

  cart.totalPrice = actualTotalPrice / 100;

  applyMacbookDiscount();
  applyGoogleHomeDiscount();
  applyAlexaDiscount();
};

const applyAlexaDiscount = () => {
  const alexaItem = cart.cartItems.find((item) => item.product.id === 3);
  if (alexaItem && alexaItem.quantity > 3) {
    const alexaTotalCost = (alexaItem.product.price * alexaItem.quantity) / 100;

    const discount = parseFloat(alexaTotalCost * 0.1).toFixed(2);
    cart.totalPrice = parseFloat((cart.totalPrice - discount).toFixed(2));
  }
};

const applyMacbookDiscount = () => {
  const macbookItem = cart.cartItems.find((item) => item.product.id === 2);
  const rBerryPiItem = cart.cartItems.find((item) => item.product.id === 4);

  if (
    macbookItem &&
    rBerryPiItem &&
    macbookItem.quantity <= rBerryPiItem.quantity
  ) {
    const discount = (rBerryPiItem.product.price * rBerryPiItem.quantity) / 100;
    cart.totalPrice = parseFloat((cart.totalPrice - discount).toFixed(2));
  }
  if (
    macbookItem &&
    rBerryPiItem &&
    macbookItem.quantity > rBerryPiItem.quantity
  ) {
    const discount = (rBerryPiItem.product.price * rBerryPiItem.quantity) / 100;
    cart.totalPrice = parseFloat((cart.totalPrice - discount).toFixed(2));
  }
};

const applyGoogleHomeDiscount = () => {
  const googleHomeItem = cart.cartItems.find((item) => item.product.id === 1);
  if (googleHomeItem) {
    const discount = (
      (Math.floor(googleHomeItem?.quantity / 3) *
        googleHomeItem.product.price) /
      100
    ).toFixed(2);

    cart.totalPrice = parseFloat((cart.totalPrice - discount).toFixed(2));
  }
};

const reduceProductQuantity = (id, quantity) => {
  products.find((product) => product.id === id).quantity -= quantity;
};

const addRemoveProductOnCart = (
  cartItemIndex,
  shouldReduce,
  quantity,
  product
) => {
  if (cartItemIndex > -1) {
    if (shouldReduce) cart.cartItems[cartItemIndex].quantity -= quantity;
    else cart.cartItems[cartItemIndex].quantity += quantity;
  } else {
    cart.cartItems.push({
      product,
      quantity,
    });
  }
};

const applyMacbookPromotion = (quantity) => {
  //if less or equal to max stock
  const maxStock = products.find((product) => product.id === 4).quantity;
  if (quantity <= maxStock) addProductToCart(4, quantity);
  else {
    addProductToCart(4, maxStock);
  }
};

const removeMacbookPromotion = (quantity) => {
  removeProductFromCart(4, quantity);
};

const isMacbook = (id) => id === 2;

const updateProductQuantityToCart = (product, quantity, shouldReduce) => {
  const cartItemIndex = getCartItemIdex(product);
  addRemoveProductOnCart(cartItemIndex, shouldReduce, quantity, product);
  return { ...cart };
};

const getCartItemIdex = (product) =>
  cart.cartItems.findIndex((item) => item.product.id === product.id);

const increaseProductQuantity = (id, quantity) => {
  products.find((product) => product.id === id).quantity += quantity;
};

const findAndValidateByProductId = (id) => {
  return products.find((product) => product.id === id);
};

const validateProductQuantity = (product, quantity) => {
  return product.quantity >= quantity;
};

module.exports = {
  getProducts,
  addProductToCart,
  resetRecords,
  removeProductFromCart,
  getCart,
  resetRecords,
};
