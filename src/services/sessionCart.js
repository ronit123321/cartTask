const { initialCart } = require("../data/initialState");
const { applyPromotions } = require("./promotionService");
var _ = require("lodash");

var sessionCart = _.cloneDeep(initialCart);

const resetSessionCart = () => {
  sessionCart = _.cloneDeep(initialCart);
};

const getSessionCart = () => {
  return { ...sessionCart };
};

const computeCartPrice = () => {
  let initialPrice = 0;
  sessionCart.cartItems.forEach((item) => {
    initialPrice += item.product.price * item.quantity;
  });
  sessionCart.totalPrice = parseFloat((initialPrice / 100).toFixed(2));
};

const updateSessionCart = (cart) => {
  //Do not modify the user cart, instead build on it
  sessionCart = _.cloneDeep(cart);
  applyPromotions(sessionCart);
  computeCartPrice();
};

module.exports = {
  getSessionCart,
  resetSessionCart,
  updateSessionCart,
};
