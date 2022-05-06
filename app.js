var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

var schema = buildSchema(`
  type product {
      id: Int
      name: String
      price: Int
  }

  type Query {
    product(id: Int!): product
    products: [product]
    hello: String
  }

  type Mutation {
      addProduct(name: String, id: Int, price: Int): String
  }
`);

const products = [
  { id: 12, name: "producto1", price: 110000 },
  { id: 13, name: "producto2", price: 120000 },
  { id: 23, name: "producto3", price: 130000 },
];

var root = {
  hello: () => "Hello world!",

  product: ({ id }) => {
    return products.find((product) => product.id === id);
  },

  products: () => products,

  addProduct: ({ id, name, price }) => {
    console.log(id, name, price);
    products.push({ id, name, price });
    return "funciono";
  },
};

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000, () => console.log("Now browse to localhost:4000/graphql"));
