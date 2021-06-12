const {
  isMacbook,
  fetchProductById,
  validateProductQuantity,
  getMacbookFromCart,
  getGoogleHomeItemFromCart,
  convertToCustomFloat,
  getAlexaItemFromCart,
  getCurrentItem,
} = require(".");
const { initialProduct } = require("../data/initialState");
const _ = require("lodash");
const { PRODUCTID } = require("../data/productId");
const {
  addProductToUserCart,
  resetUserCart,
} = require("../services/userCartService");

describe("utils", () => {
  let products;

  beforeEach(() => {
    products = _.cloneDeep(initialProduct);
  });

  test("isMacbook - validate id matches macbook id", () => {
    const resultValid = isMacbook(PRODUCTID.MacBookPro);
    expect(resultValid).toBe(true);
    const resultInvalid = isMacbook(PRODUCTID.RaspberryPiB);
    expect(resultInvalid).toBe(false);
  });

  test("fetchProductById - provided id exist in products list", () => {
    const resultValid = fetchProductById(products, PRODUCTID.MacBookPro);
    expect(resultValid).toBeDefined();
    const resultInvalid = fetchProductById(products, 8);
    expect(resultInvalid).not.toBeDefined();
  });

  test("validateProductQuantity - product quantity is greater than provided quantity", () => {
    const resultValid = validateProductQuantity(products[0], 2);
    expect(resultValid).toBe(true);
    const resultInvalid = validateProductQuantity(products[0], 20);
    expect(resultInvalid).toBe(false);
  });

  test("getMacbookFromCart: extract macbook items from cart", () => {
    const cartValid = addProductToUserCart(products[1], 1);
    const resultValid = getMacbookFromCart(cartValid);
    expect(resultValid.product.id).toBe(PRODUCTID.MacBookPro);
    resetUserCart();
    const cartInValid = addProductToUserCart(products[0], 1);
    const resultInvalid = getMacbookFromCart(cartInValid);
    expect(resultInvalid).not.toBeDefined();
  });

  test("getGoogleHomeItemFromCart: extract google home items from cart", () => {
    const cartValid = addProductToUserCart(products[0], 1);
    const resultValid = getGoogleHomeItemFromCart(cartValid);
    expect(resultValid.product.id).toBe(PRODUCTID.GoogleHome);
    resetUserCart();
    const cartInValid = addProductToUserCart(products[1], 1);
    const resultInvalid = getGoogleHomeItemFromCart(cartInValid);
    expect(resultInvalid).not.toBeDefined();
  });

  test("getAlexaItemFromCart: extract google home items from cart", () => {
    const cartValid = addProductToUserCart(products[2], 1);
    const resultValid = getAlexaItemFromCart(cartValid);
    expect(resultValid.product.id).toBe(PRODUCTID.AlexaSpeaker);
    resetUserCart();
    const cartInValid = addProductToUserCart(products[1], 1);
    const resultInvalid = getAlexaItemFromCart(cartInValid);
    expect(resultInvalid).not.toBeDefined();
  });

  test("getCurrentItem", () => {
    let cartValid = addProductToUserCart(products[0], 1);
    cartValid = addProductToUserCart(products[1], 1);

    const resultValid = getCurrentItem(PRODUCTID.GoogleHome, cartValid);
    expect(resultValid.product.id).toBe(PRODUCTID.GoogleHome);

    const resultInvalid = getCurrentItem(PRODUCTID.AlexaSpeaker, cartValid);
    expect(resultInvalid).not.toBeDefined();
  });

  test("convertToCustomFloat", () => {
    const pi = 22 / 7;

    const resultValid = convertToCustomFloat(pi);
    expect(resultValid).toBe(3.14);
  });
});
