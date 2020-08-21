import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList, AsyncStorage } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { HomeStackParamsList, TabNavigator, Screens } from '@routeTypes';
import { useQuery, useApolloClient, ApolloClient } from '@apollo/client';

import ItemCard from '../components/common/ItemCard';
import LoadingIndicator from '../components/common/LoadingIndicator';
import Error from '../components/common/Error';
import { GET_ME, IS_LOGGED_IN, GET_CURRENT_USER, GET_LISTINGS } from '../constant/queries';
import { Button } from 'react-native-paper';
import { logout } from '../lib/utils';

interface Props {
  navigation: NavigationProp<HomeStackParamsList, 'home'>;
}

const Newsfeed = ({ navigation }: Props) => {
  console.log('In News Feed');
  const client: ApolloClient<any> = useApolloClient();

  // Graphql Queries
  const { data, error } = useQuery(IS_LOGGED_IN);
  const { data: data1 } = useQuery(GET_CURRENT_USER);

  const {
    data: listingData,
    loading: listingLoading,
    error: errorListing,
    refetch: refetchListings,
  } = useQuery(GET_LISTINGS, { fetchPolicy: 'cache-first' });

  // Section
  if (listingLoading) return <LoadingIndicator />;
  if (errorListing) return <Error />;

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
          client.writeQuery({
            query: GET_CURRENT_USER,
            data: {
              getCurrentUser: {
                email: '',
                id: '',
                username: '',
              },
            },
          });
        }}
      >
        DELETE CACHE
      </Button>

      <Button onPress={() => navigation.navigate(TabNavigator.PROFILE_TAB, { screen: Screens.PROFILE })}>
        To Profile
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
