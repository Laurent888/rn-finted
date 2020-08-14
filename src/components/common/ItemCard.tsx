import * as React from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { AntDesign as Icon, MaterialIcons } from '@expo/vector-icons';
import { Screens } from '@routeTypes';
import { Listing } from '@constants/types';

import theme from '../../style/theme';
import Price from './Price';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('screen');

const LeftContent = (props) => (
  <Avatar.Image
    {...props}
    source={{
      uri:
        'https://images.unsplash.com/photo-1593642531955-b62e17bdaa9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    }}
    size={24}
    style={{ marginRight: 10 }}
  />
);

interface Props {
  navigation: any;
  item: Listing;
}

const ItemCard = ({ navigation, item }: Props) => {
  const {
    title,
    price,
    images,
    id,
    owner: { username },
  } = item;
  const cardWidth = WIDTH / 2 - 1.5 * 10;

  const navigateToListing = () => {
    navigation.navigate(Screens.LISTING, { id });
  };

  return (
    <TouchableOpacity onPress={navigateToListing} style={{ width: cardWidth }}>
      <Card elevation={0} style={[s.cardContainer]}>
        <View style={s.header}>
          <LeftContent />
          <Text style={s.username}>{username}</Text>
        </View>
        <Card.Cover
          source={{
            uri: images[0],
          }}
        />
        <Card.Content style={{ paddingHorizontal: 4, paddingTop: 5 }}>
          <View style={s.priceRow}>
            <Price price={price} />
            <View style={s.likes}>
              <Icon name="heart" size={15} style={[s.icon, s.grey]} />
              <Text style={s.grey}>4</Text>
            </View>
          </View>
          <View>
            <Text style={[s.grey]} numberOfLines={1}>
              {title}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default ItemCard;

const s = StyleSheet.create({
  cardContainer: {
    borderColor: 'transparent',
  },
  grey: {
    color: theme.colors.mediumGrey,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likes: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 3,
  },
  icon: {
    marginRight: 3,
  },
  title: {
    fontSize: theme.fontSize.caption,
    flexWrap: 'nowrap',
  },
  username: {
    color: theme.colors.mediumGrey,
  },
});
