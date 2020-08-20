import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp, NavigationProp } from '@react-navigation/native';
import theme from '@theme';
import { useQuery, useMutation } from '@apollo/client';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Menu, Provider } from 'react-native-paper';
import { Screens, HomeStackParamsList } from '@routeTypes';
import UserInfoButton from '@components/common/UserInfoButton';
import { GET_LISTING, GET_CURRENT_USER, DELETE_LISTING, GET_LISTINGS } from '@constants/queries';

import ListingHeader from './ListingHeader';
import ItemDescription from './ItemDescription';
import DetailsButtons from './DetailsButtons';
import Postage from './Postage';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import Error from '../../components/common/Error';

type ListingRouteProp = RouteProp<HomeStackParamsList, 'listing'>;
type ListingNavigationProp = NavigationProp<HomeStackParamsList, 'listing'>;

const Listing = () => {
  const { params } = useRoute<ListingRouteProp>();
  const n = useNavigation<ListingNavigationProp>();
  const [currentUserOwner, setCurrentUserOwner] = useState(false);
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const handleDelete = () => {
    closeMenu();
    Alert.alert(
      'DELETE ITEM',
      "By pressing 'Confirm and Delete' you confirm that you haven't sold this item on Finted",
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Confirm and Delete',
          onPress: () => deleteListing(),
          style: 'destructive',
        },
      ]
    );
  };

  useLayoutEffect(() => {
    if (currentUserOwner) {
      n.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={openMenu}>
            <Icon name="menu-down" size={28} color="black" />
          </TouchableOpacity>
        ),
        headerRightContainerStyle: { paddingHorizontal: 10 },
      });
    }
  }, [currentUserOwner]);

  const [deleteListing] = useMutation(DELETE_LISTING, {
    variables: { id: params?.id },
    update(cache) {
      const listings = cache.readQuery({ query: GET_LISTINGS });
      const updatedListings = listings.getListings.filter((item) => item.id !== params.id);
      cache.writeQuery({
        query: GET_LISTINGS,
        data: {
          getListings: [...updatedListings],
        },
      });
    },
    onCompleted() {
      n.goBack();
    },
  });
  const { data: cData } = useQuery(GET_CURRENT_USER);
  const { data, loading, error } = useQuery(GET_LISTING, {
    variables: { id: params?.id },
    fetchPolicy: 'cache-first',
    onCompleted() {
      if (data.getListing.owner.id === cData.getCurrentUser.id) {
        setCurrentUserOwner(true);
      }
    },
  });

  useLayoutEffect(() => {
    if (currentUserOwner) {
      n.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={openMenu}>
            <Icon name="menu-down" size={28} color="black" />
          </TouchableOpacity>
        ),
        headerRightContainerStyle: { paddingHorizontal: 10 },
      });
    }
  }, [currentUserOwner]);

  if (loading) return <LoadingIndicator />;
  if (error) return <Error error={error} />;

  const { getListing } = data;
  const {
    title,
    price,
    description,
    images,
    category,
    createdAt,
    owner: { username, id: ownerId },
  } = getListing;

  const navigateToOtherProfile = () => {
    n.push(Screens.OTHER_PROFILE, { id: params.id, username, ownerId });
  };
  console.log(createdAt, 'CreatedAt');
  return (
    <Provider>
      <ScrollView>
        <View style={s.imgContainer}>
          <Image
            style={s.img}
            source={{
              uri: images[0],
            }}
          />
        </View>
        <View>
          <UserInfoButton onPress={navigateToOtherProfile} username={username} />

          <ListingHeader title={title} price={price} />

          <ItemDescription description={description} />

          <DetailsButtons category={category} createdAt={createdAt} navigation={n} />

          <Postage price="23e" />
        </View>
      </ScrollView>

      <Menu visible={visible} onDismiss={closeMenu} anchor={{ x: 220, y: 0 }}>
        <Menu.Item onPress={() => {}} title="Edit" />
        <Menu.Item
          onPress={handleDelete}
          title="Delete"
          titleStyle={{ color: theme.colors.error }}
        />
      </Menu>
    </Provider>
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
});
