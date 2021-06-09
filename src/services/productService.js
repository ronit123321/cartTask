const { initialProduct } = require("../data/initialState");

var _ = require("lodash");

var products = _.cloneDeep(initialProduct);


const reduceProductQuantity = (products, id, quantity) => {
  products.find((product) => product.id === id).quantity -= quantity;
  return products;
};

const increaseProductQuantity = (id, quantity) => {
  products.find((product) => product.id === id).quantity += quantity;
};

const resetProducts = () => {
  products = _.cloneDeep(initialProduct);
};

const getSessionProducts = () => {
  return [...products];
}

module.exports = {
    reduceProductQuantity,
    increaseProductQuantity,
    resetProducts,
    getSessionProducts
};
