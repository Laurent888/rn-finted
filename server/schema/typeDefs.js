const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    email: String
    username: String
    listings: [Listing]
  }

  type Listing {
    id: ID!
    title: String
    description: String
    price: Int
    images: [String]
    owner: User
  }

  input CreateListingInput {
    title: String!
    price: Int!
    description: String!
    owner: ID!
    images: [String]
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
    me: User
    getListings: [Listing]
    getListing(id: ID!): Listing
    refreshToken(token: String): String
  }

  type Mutation {
    login(email: String, password: String): String
    createUser(email: String, password: String, username: String): String
    deleteUser(id: ID): String
    createListing(newListing: CreateListingInput): Listing
    deleteListing(id: ID): String
  }
`;

module.exports = typeDefs;
