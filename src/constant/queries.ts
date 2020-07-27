import gql from "graphql-tag";

// QUERIES

export const GET_ME = gql`
  query {
    me {
      id
      email
      username
    }
  }
`;

export const GET_USERS = gql`
  query {
    getUsers {
      email
    }
  }
`;

export const REFRESH_TOKEN = gql`
  query RefreshToken($token: String) {
    refreshToken(token: $token)
  }
`;

export const IS_LOGGED_IN = gql`
  query IsLoggedIn {
    isLoggedIn @client
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser @client {
      id
      username
      email
    }
  }
`;

// MUTATIONS

export const LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password)
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($email: String, $password: String, $username: String) {
    createUser(email: $email, password: $password, username: $username)
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const CREATE_LISTING = gql`
  mutation CreateListing($newListing: CreateListingInput!) {
    createListing(newListing: $newListing) {
      id
      title
      description
      price
      owner
    }
  }
`;

export const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID) {
    deleteListing(id: $id)
  }
`;
