const applyAlexaDiscount = (cart) => {
  const alexaItem = cart.cartItems.find((item) => item.product.id === 3);
  if (alexaItem && alexaItem.quantity > 3) {
    const alexaTotalCost = (alexaItem.product.price * alexaItem.quantity) / 100;

    const discount = parseFloat(alexaTotalCost * 0.1).toFixed(2);
    cart.totalPrice = parseFloat((cart.totalPrice - discount).toFixed(2));
  }

  return cart;
};

const applyMacbookDiscount = (cart) => {
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

  return cart;
};

const applyGoogleHomeDiscount = (cart) => {
  const googleHomeItem = cart.cartItems.find((item) => item.product.id === 1);
  if (googleHomeItem) {
    const discount = (
      (Math.floor(googleHomeItem?.quantity / 3) *
        googleHomeItem.product.price) /
      100
    ).toFixed(2);

    cart.totalPrice = parseFloat((cart.totalPrice - discount).toFixed(2));
  }

  return cart;
};

module.exports = {
    applyAlexaDiscount,
    applyMacbookDiscount,
    applyGoogleHomeDiscount
}