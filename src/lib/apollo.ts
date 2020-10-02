/* eslint-disable */

import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';
import { onError } from '@apollo/link-error';
import { setContext } from '@apollo/link-context';
import { AsyncStorage } from 'react-native';
import { IS_LOGGED_IN, GET_CURRENT_USER } from '@constants/queries';

import { captureErrors, logout } from './utils';

const resetAuth = (cache) => {
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

export const makeApolloClient = () => {
  const cache = new InMemoryCache();

  resetAuth(cache);

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    console.log('In Error link');
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        if (message === 'Please login') {
          logout();
          resetAuth(cache);
        }
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      });
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const authLink = setContext(async (_, { headers }) => {
    try {
      const token = await AsyncStorage.getItem('TOKEN');

      console.log('In auth link token:', token ? 'YES' : 'NO');
      if (token) {
        cache.writeQuery({
          query: IS_LOGGED_IN,
          data: {
            isLoggedIn: true,
          },
        });
      } else {
        resetAuth(cache);
      }

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    } catch (error) {
      captureErrors('Apollo Authlink ', error);
    }
  });

  const httpLink = new HttpLink({
    uri: 'http://192.168.1.6:4000/',
    credentials: 'same-origin',
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache,
  });

  return client;
};
