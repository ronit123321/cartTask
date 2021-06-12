### I prefer using yarn

`yarn start` runs graphql server on http://localhost:4000/graphql

Alternatively you can run test cases using jest by running `yarn test` or `yarn test:watch`

###SOME QUICK QUERY FOR EXECUTION

### Get all product
{
  getProducts {
    id,
    sku,
    title,
    quantity,
    price
  }
}


### Get cart info
{
  getCart {
    itemCount,
    totalPrice,
    cartItems {
      quantity
    }
  }
}

### Macbook freebie test
{
  addProduct(id: 2, quantity: 1) {
    totalPrice,
    cartItems {
      quantity
      product {
        id,
        sku,
        title,
        quantity,
        price
      }
    }
  }
}

### Google home buy 3 for 2
{
  addProduct(id: 1, quantity: 3) {
    totalPrice,
    cartItems {
      quantity
      product {
        id,
        sku,
        title,
        quantity,
        price
      }
    }
  }
}

### Alexa speaker 10pc discount
{
  addProduct(id: 3, quantity: 4) {
    totalPrice,
    cartItems {
      quantity
      product {
        id,
        sku,
        title,
        quantity,
        price
      }
    }
  }
}

