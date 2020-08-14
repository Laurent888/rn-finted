import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import theme from '@theme';
import { useQuery } from '@apollo/client';

import ListingHeader from './ListingHeader';
import ItemDescription from './ItemDescription';
import DetailsButtons from './DetailsButtons';
import Postage from './Postage';
import { GET_LISTING } from '@constants/queries';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import Error from '../../components/common/Error';
import { Avatar } from 'react-native-paper';
import { Screens } from '@routeTypes';
import UserInfoButton from '@components/common/UserInfoButton';

const Listing = () => {
  const { params } = useRoute();
  const n = useNavigation();

  const { data, loading, error } = useQuery(GET_LISTING, {
    variables: { id: params.id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <LoadingIndicator />;
  if (error) return <Error error={error} />;

  const { getListing } = data;
  const {
    title,
    price,
    description,
    images,
    owner: { username, id: ownerId },
  } = getListing;

  const navigateToOtherProfile = () => {
    n.push(Screens.OTHER_PROFILE, { id: params.id, username, ownerId });
  };

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
        <UserInfoButton onPress={navigateToOtherProfile} username={username} />

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
});
