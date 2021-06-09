const { initialCart } = require("../data/initialState");
const {
  applyAlexaDiscount,
  applyGoogleHomeDiscount,
  applyMacbookDiscount,
} = require("../services/discountService");
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

  return applyDiscountsAndPromotions();
};

const applyDiscountsAndPromotions = () => {
  applyMacbookDiscount(cart);
  applyGoogleHomeDiscount(cart);
  applyAlexaDiscount(cart);

  return { ...cart };
};

const resetCart = () => {
  cart = _.cloneDeep(initialCart);
};

module.exports = {
  getUserCart,
  updateProductQuantityToCart,
  calculateCartPrice,
  resetCart,
};
