const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Miniature {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    miniatures: [Miniature]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    miniatures(category: ID, name: String): [Miniature]
    miniature(_id: ID!): Miniature
    user: User
    order(_id: ID!): Order
    checkout(miniatures: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(miniatures: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateMiniature(_id: ID!, quantity: Int!): Miniature
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
