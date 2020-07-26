import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
  makeVar,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/link-error";
import { setContext } from "@apollo/link-context";
import { AsyncStorage } from "react-native";

export const isLoggedInVar = makeVar(false);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
      },
    },
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("TOKEN");

  if (token) {
    isLoggedInVar(true);
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = new HttpLink({
  uri: "http://192.168.1.6:4000/",
  credentials: "same-origin",
});

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache,
});
