var express = require("express");
var graphqlHTTP = require("express-graphql").graphqlHTTP;
var { buildSchema } = require("graphql");

var {
  getProducts,
  addProductToCart,
  getCart,
  resetRecords,
} = require("./routes");

var cors = require("cors");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Product {
    id: Int,
    sku: String,
    title: String
    quantity: Int,
    price: Float,
  }
  type Cart {
    itemCount: Int,
    totalPrice: Float,
    cartItems: [CartItem],
  }
  type CartItem {
    product: Product,
    quantity: Int,
  }
  type Query {
    getProducts: [Product],
    addProduct(id: Int, quantity: Int): Cart,
    removeProduct(id: Int, quantity: Int): Cart,
    getCart: Cart,
    clearCart: Cart
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  getProducts: () => {
    return getProducts();
  },
  addProduct: ({ id, quantity }) => {
    return addProductToCart(id, quantity);
  },
  removeProduct: ({ id }) => {
    const products = getProducts();
    return products.find((p) => p.id === id);
  },
  getCart: () => {
    return getCart();
  },
  clearCart: () => resetRecords(),
};

var app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");
