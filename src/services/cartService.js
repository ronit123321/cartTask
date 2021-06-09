const { initialCart } = require("../data/initialState");
var _ = require("lodash");

var cart = _.cloneDeep(initialCart);

const updateProductQuantityToCart = (product, quantity, shouldReduce) => {
  const cartItemIndex = getCartItemIdex(product);
  addRemoveProductOnCart(cartItemIndex, shouldReduce, quantity, product);
  return { ...cart };
};

const getCartItemIdex = (product) =>
  cart.cartItems.findIndex((item) => item.product.id === product.id);

const getUserCart = () => {
  return { ...cart };
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

const calculateCartPrice = () => {
  let actualTotalPrice = 0;
  cart.cartItems.forEach((item) => {
    actualTotalPrice += item.product.price * item.quantity;
  });

  cart.totalPrice = actualTotalPrice / 100;

  applyMacbookDiscount();
  applyGoogleHomeDiscount();
  applyAlexaDiscount();

  return { ...cart };
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

const resetCart = () => {
  cart = _.cloneDeep(initialCart);
};

module.exports = {
  getUserCart,
  updateProductQuantityToCart,
  calculateCartPrice,
  resetCart
};
