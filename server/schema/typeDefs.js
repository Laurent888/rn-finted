const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    username: String!
    userPicture: String
    listings: [Listing]
  }

  type Listing {
    id: ID!
    title: String!
    description: String!
    price: Int!
    images: [String]
    ownerId: String
    owner: User
    category: [String]
    createdAt: String
    updatedAt: String
  }

  type KlarnaResponse {
    order_id: String
    status: String
    purchase_country: String
    purchase_currency: String
    order_amount: Int
    order_tax_amount: Int
    html_snippet: String
  }

  input CreateListingInput {
    title: String!
    price: Int!
    description: String!
    ownerId: String
    owner: ID
    images: [String]
    category: [String]
  }

  input ItemOrder {
    title: String!
    totalPrice: Float!
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
    me: User
    getListings(ownerId: String, keyword: String): [Listing]
    getListing(id: ID!): Listing
    refreshToken(token: String): String
    confirmOrder(orderId: String): KlarnaResponse
  }

  type Mutation {
    login(email: String, password: String): String
    createUser(email: String, password: String, username: String): String
    deleteUser(id: ID): String
    createListing(newListing: CreateListingInput): Listing
    deleteListing(id: ID): String
    deleteAllListings: String
    checkout(order: ItemOrder): KlarnaResponse
  }
`;

module.exports = typeDefs;
