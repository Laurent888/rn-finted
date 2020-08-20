import { ApolloClient, createHttpLink, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';
import { onError } from '@apollo/link-error';
import { setContext } from '@apollo/link-context';
import { AsyncStorage } from 'react-native';
import { IS_LOGGED_IN, GET_CURRENT_USER } from '@constants/queries';

import { logout } from './utils';

const cache = new InMemoryCache();

const resetAuth = () => {
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
};

resetAuth();

const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.log(errorLink);
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (message === 'Please login') {
        logout();
        resetAuth();
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
  console.log('In auth link:', token);
  if (token) {
    cache.writeQuery({
      query: IS_LOGGED_IN,
      data: {
        isLoggedIn: true,
      },
    });
  } else {
    resetAuth();
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = new HttpLink({
  uri: 'http://192.168.0.39:4000/',
  credentials: 'same-origin',
});

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache,
});
