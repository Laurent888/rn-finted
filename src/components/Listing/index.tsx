import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import theme from '@theme';
import { useQuery } from '@apollo/client';

import ListingHeader from './ListingHeader';
import ItemDescription from './ItemDescription';
import DetailsButtons from './DetailsButtons';
import Postage from './Postage';
import { GET_LISTING } from '@constants/queries';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import Error from '../../components/common/Error';

const Listing = () => {
  const { params } = useRoute();

  const { data, loading, error } = useQuery(GET_LISTING, {
    variables: { id: params.id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <LoadingIndicator />;
  if (error) return <Error error={error} />;

  const { getListing } = data;
  const { title, price, description, images } = getListing;

  return (
    <ScrollView>
      <View style={s.imgContainer}>
        <Image
          style={s.img}
          source={{
            uri: images[0],
          }}
        />
      </View>
      <View style={s.contentContainer}>
        <View style={s.userInfo}>
          <View>
            <Text>Avatar</Text>
          </View>
          <View>
            <Text>Text</Text>
            <Text>Stars</Text>
          </View>
        </View>

        <ListingHeader title={title} price={price} />
        <ItemDescription description={description} />
        <DetailsButtons />

        <Postage price="23e" />
      </View>
    </ScrollView>
  );
};

export default Listing;

const s = StyleSheet.create({
  imgContainer: {
    width: '100%',
    height: 400,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {},
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: theme.padding.container,
  },
});
