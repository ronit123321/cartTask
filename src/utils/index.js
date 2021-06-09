const { PRODUCTID } = require("../data/productId");

const findAndValidateByProductId = (products, id) => {
  return products.find((product) => product.id === id);
};

const validateProductQuantity = (product, quantity) => {
  return product.quantity >= quantity;
};

const isMacbook = (id) => id === PRODUCTID.MacBookPro;

module.exports = {
  isMacbook,
  findAndValidateByProductId,
  validateProductQuantity,
};
