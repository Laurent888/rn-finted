import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { RouteProp, useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import { StackSearchParamsList } from '@routeTypes';
import { useQuery } from '@apollo/client';
import { GET_LISTINGS } from '@constants/queries';
import LoadingIndicator from '@components/common/LoadingIndicator';
import Error from '@components/common/Error';
import ItemCard from '@components/common/ItemCard';
import SearchBarHeader from '@components/common/SearchBarHeader';

type ListingsRouteProps = RouteProp<StackSearchParamsList, 'listings'>;
type ListingsNavigationProps = NavigationProp<StackSearchParamsList, 'listings'>;

const Listings = () => {
  const { params } = useRoute<ListingsRouteProps>();
  const n = useNavigation<ListingsNavigationProps>();

  const [searchValue, setSearchValue] = useState('');

  n.setOptions({
    header: () => (
      <SearchBarHeader
        value={searchValue}
        onChangeText={(text) => setSearchValue(text)}
        onSubmitEditing={() => console.log('Search')}
        onBackPress={() => n.goBack()}
      />
    ),
  });

  const { data, loading, error } = useQuery(GET_LISTINGS, { variables: { keyword: params.keyword } });

  if (loading) return <LoadingIndicator />;
  if (error) return <Error error={error} />;

  const { getListings } = data;

  return (
    <FlatList
      data={getListings}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ItemCard item={item} navigation={n} />}
      numColumns={2}
      contentContainerStyle={{
        paddingHorizontal: 10,
        paddingBottom: 60,
      }}
      columnWrapperStyle={{
        paddingVertical: 10,
        justifyContent: 'space-between',
      }}
    />
  );
};

export default Listings;
