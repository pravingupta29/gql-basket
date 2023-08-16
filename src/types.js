const { gql } = require("graphql-tag");

const typeDefs = gql`
  #graphql
  type Entry {
    product: Product!
    quantity: Float!
  }

  type Basket {
    id: ID!
    entries: [Entry!]!
    user: User
  }

  type User @key(fields: "id") {
    id: ID!
  }

  type Product @key(fields: "id") {
    id: ID!
  }

  input AddItemPayload {
    productId: String!
    quantity: Float!
  }

  type Query {
    basket(id: ID): Basket
  }

  type Mutation {
    addItem(item: AddItemPayload): Basket
  }
`;

module.exports = typeDefs;
