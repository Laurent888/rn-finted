const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    email: String
    username: String
    listings: [Listing]
  }

  type Listing {
    id: ID!
    name: String
    description: String
    price: Int
    owner: User!
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
  }
`;

module.exports = typeDefs;
