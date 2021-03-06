const {
  getProducts,
  addProductToCart,
  resetRecords,
  removeProductFromCart,
  getCart
} = require(".");

const { PRODUCTID } = require("../data/productId");

describe("CartTest", () => {
  afterEach(() => {
    resetRecords();
  });

  test("getProducts: should return all products", () => {
    let result1 = getProducts();
    expect(result1.length).toBe(4);
  });

  test("getProducts: should return all products count reducing ones from cart", () => {
    let result2 = getProducts();
    expect(result2[0].quantity).toBe(10);

    addProductToCart(PRODUCTID.GoogleHome, 2);
    result2 = getProducts();
    expect(result2[0].quantity).toBe(8);

    addProductToCart(PRODUCTID.GoogleHome, 4);
    result2 = getProducts();
    expect(result2[0].quantity).toBe(4);

    //ignore invalid request and return previous state
    addProductToCart(PRODUCTID.GoogleHome, 5);
    result2 = getProducts();
    expect(result2[0].quantity).toBe(4);
  });

  test("addProductToCart: valid product id and quantity", () => {
    addProductToCart(PRODUCTID.MacBookPro, 5);
    expect(getProducts()[1].quantity).toBe(0);
  });

  test("addProductToCart: valid product id and invalid quantity", () => {
    const result3 = addProductToCart(PRODUCTID.GoogleHome, 20);
    expect(result3).toStrictEqual({
      itemCount: 0,
      totalPrice: 0,
      cartItems: [],
    });
  });

  test("addProductToCart: invalid product id and valid quantity", () => {
    const result4 = addProductToCart(11, 2);
    expect(result4).toStrictEqual({
      itemCount: 0,
      totalPrice: 0,
      cartItems: [],
    });
  });

  test("addProductToCart: invalid product id and invalid quantity", () => {
    const result5 = addProductToCart(11, 25);
    expect(result5).toStrictEqual({
      itemCount: 0,
      totalPrice: 0,
      cartItems: [],
    });
  });

  test("removeProductFromCart: valid product id and valid quantity", () => {
    addProductToCart(PRODUCTID.GoogleHome, 2);

    expect(getProducts()[0].quantity).toBe(8);

    removeProductFromCart(PRODUCTID.GoogleHome, 2);

    expect(getProducts()[0].quantity).toBe(10);
  });

  test("Macbook promotion : freebie in stock", () => {
    let cart = addProductToCart(PRODUCTID.MacBookPro, 1);
    expect(cart.cartItems.length).toBe(2);
    expect(cart.totalPrice).toBe(5399.99);
    cart = addProductToCart(PRODUCTID.MacBookPro, 1);
    expect(cart.cartItems.length).toBe(2);
    expect(cart.totalPrice).toBe(5399.99 * 2);
  });

  test("Macbook promotion : freebie out of stock", () => {
    let cart = addProductToCart(PRODUCTID.MacBookPro, 3);
    expect(cart.cartItems.length).toBe(2);
    expect(cart.totalPrice).toBe(5399.99 * 3);
  });

  test("GoogleHome promotion: Buy3GoogleHomesforthepriceof2", () => {
    //test price for 2
    let cart = addProductToCart(PRODUCTID.GoogleHome, 2);
    expect(cart.cartItems.length).toBe(1);
    expect(cart.totalPrice).toBe(49.99 * 2);
    //add one more item
    cart = addProductToCart(PRODUCTID.GoogleHome, 1);
    expect(cart.cartItems.length).toBe(1);
    expect(cart.totalPrice).toBe(49.99 * 2);

    cart = addProductToCart(PRODUCTID.GoogleHome, 7);
    expect(cart.totalPrice).toBe(49.99 * 7);
  });

  test("AlexaSpeaker promotion: 10 pc discount on more than 3", () => {
    //test price for 2
    let cart = addProductToCart(PRODUCTID.AlexaSpeaker, 2);
    expect(cart.cartItems.length).toBe(1);
    expect(cart.totalPrice).toBe(109.5 * 2);
    //add one more item
    cart = addProductToCart(PRODUCTID.AlexaSpeaker, 1);
    expect(cart.cartItems.length).toBe(1);
    expect(cart.totalPrice).toBe(109.5 * 3);
    //more than 3
    cart = addProductToCart(PRODUCTID.AlexaSpeaker, 1);
    expect(cart.totalPrice).toBe(109.5 * 4 - 109.5 * 4 * 0.1);
    cart = addProductToCart(PRODUCTID.AlexaSpeaker, 6);
    expect(cart.totalPrice).toBe(109.5 * 10 - 109.5 * 10 * 0.1);
  });

  test("getCart", () => {
    addProductToCart(PRODUCTID.GoogleHome, 3)
    const cart = getCart()
    expect(cart.cartItems.length).toBe(1)
  });
});
