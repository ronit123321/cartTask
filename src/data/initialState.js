const { PRODUCTID } = require("./productId");

const initialProduct = [
  {
    id: PRODUCTID.GoogleHome,
    sku: "120P90",
    title: "GoogleHome",
    quantity: 10,
    price: 4999,
  },
  {
    id: PRODUCTID.MacBookPro,
    sku: "43N23P",
    title: "MacBookPro",
    quantity: 5,
    price: 539999,
  },
  {
    id: PRODUCTID.AlexaSpeaker,
    sku: "A304SD",
    title: "AlexaSpeaker",
    quantity: 10,
    price: 10950,
  },
  {
    id: PRODUCTID.RaspberryPiB,
    sku: "234234",
    title: "RaspberryPiB",
    quantity: 2,
    price: 3000,
  },
];

const initialCart = {
  itemCount: 0,
  totalPrice: 0,
  cartItems: [],
};

module.exports = {
  initialProduct,
  initialCart,
};
