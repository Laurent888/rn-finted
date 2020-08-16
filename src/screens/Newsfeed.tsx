import React from 'react';
import { StyleSheet, View, FlatList, AsyncStorage } from 'react-native';

import ItemCard from '../components/common/ItemCard';
import { useQuery, useApolloClient, ApolloClient } from '@apollo/client';
import LoadingIndicator from '../components/common/LoadingIndicator';
import Error from '../components/common/Error';
import {
  GET_ME,
  GET_USERS,
  IS_LOGGED_IN,
  GET_CURRENT_USER,
  GET_LISTINGS,
} from '../constant/queries';
import { Button } from 'react-native-paper';
import { logout } from '../lib/utils';
import { useLinkProps, StackActions } from '@react-navigation/native';
import { Screens, TabNavigator } from '@routeTypes';

const Newsfeed = ({ navigation }) => {
  const client: ApolloClient<any> = useApolloClient();

  // Graphql Queries
  const { data, loading, error } = useQuery(IS_LOGGED_IN);
  const { data: data1 } = useQuery(GET_CURRENT_USER);
  const {
    data: listingData,
    loading: listingLoading,
    error: errorListing,
    refetch: refetchListings,
  } = useQuery(GET_LISTINGS, { fetchPolicy: 'cache-and-network' });
  const { data: mData, loading: mLoading, error: mError } = useQuery(GET_ME, {
    fetchPolicy: 'network-only',
  });

  // Section
  if (listingLoading || mLoading) return <LoadingIndicator />;
  if (errorListing) return <Error error={error} />;

  if (!mError && mData) {
    const { me } = mData;
    client.writeQuery({
      query: GET_CURRENT_USER,
      data: {
        getCurrentUser: {
          email: me.email,
          id: me.id,
          username: me.username,
        },
      },
    });
  }

  const { getListings } = listingData;

  return (
    <View style={{ backgroundColor: '#fff' }}>
      {/* <Button
        onPress={async () => {
          const res = await AsyncStorage.getItem('TOKEN');
          console.log(data, res, 'TEST');
          console.log(data1, 'USER IN CACHE');
        }}
      >
        Test
      </Button>
      <Button
        onPress={() => {
          logout();
          client.writeQuery({
            query: IS_LOGGED_IN,
            data: {
              isLoggedIn: false,
            },
          });
        }}
      >
        DELETE CACHE
      </Button> */}

      <FlatList
        data={getListings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ItemCard navigation={navigation} item={item} />}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingBottom: 60,
        }}
        columnWrapperStyle={{
          paddingVertical: 10,
          justifyContent: 'space-between',
        }}
        onRefresh={() => {
          refetchListings();
        }}
        refreshing={listingLoading}
      />
    </View>
  );
};

export default Newsfeed;

const styles = StyleSheet.create({});
