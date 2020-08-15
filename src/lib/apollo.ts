import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
  makeVar,
  HttpLink,
} from '@apollo/client';
import { onError } from '@apollo/link-error';
import { setContext } from '@apollo/link-context';
import { AsyncStorage } from 'react-native';
import { IS_LOGGED_IN, GET_CURRENT_USER } from '@constants/queries';
import { logout } from './utils';

const cache = new InMemoryCache();

cache.writeQuery({
  query: IS_LOGGED_IN,
  data: {
    isLoggedIn: false,
  },
});

cache.writeQuery({
  query: GET_CURRENT_USER,
  data: {
    getCurrentUser: {
      id: '',
      email: '',
      username: '',
    },
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.log(errorLink);
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (message === 'Please login') {
        logout();
      }
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('TOKEN');

  if (token) {
    cache.writeQuery({
      query: IS_LOGGED_IN,
      data: {
        isLoggedIn: true,
      },
    });
  } else {
    cache.writeQuery({
      query: IS_LOGGED_IN,
      data: {
        isLoggedIn: false,
      },
    });
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = new HttpLink({
  uri: 'http://192.168.1.6:4000/',
  credentials: 'same-origin',
});

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache,
});
