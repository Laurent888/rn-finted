import gql from "graphql-tag";

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

export const GET_ME = gql`
  query {
    me {
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
