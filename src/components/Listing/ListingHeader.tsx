import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from '@theme';

import Button from '../common/Button';

interface Props {
  title: string;
  price: number;
}

const ListingHeader = ({ title, price }: Props) => {
  return (
    <View style={s.container}>
      <View>
        <Text>{title}</Text>
        <Text style={s.condition}>Condition</Text>
        <Text style={s.price}>{price}</Text>
      </View>

      <View style={s.buttons}>
        <Button mode="outlined" style={{ marginBottom: 20 }}>
          Ask Seller
        </Button>

        <Button mode="contained">Buy Now</Button>
      </View>

      <View style={s.refund}>
        <View style={s.iconContainer}>
          <Text>Icon</Text>
        </View>
        <View>
          <Text>Be covered by our refund policy</Text>
          <Text>Learn more about Buyer Protection</Text>
        </View>
      </View>

      <View style={s.favoriteShare}>
        <Button style={s.btn}>Favorite</Button>
        <View style={s.divider} />
        <Button style={s.btn}>Share</Button>
      </View>
    </View>
  );
};

export default ListingHeader;

const s = StyleSheet.create({
  container: {
    paddingHorizontal: theme.padding.container,
    paddingVertical: theme.padding.medium,
    backgroundColor: '#fff',
  },
  condition: {
    color: theme.colors.mediumGrey,
  },
  price: {},
  buttons: {
    paddingVertical: 30,
  },
  refund: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 30,
  },
  iconContainer: {
    marginRight: 15,
  },
  favoriteShare: {
    paddingVertical: theme.padding.small,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: theme.colors.lightGrey,
  },
  btn: {
    flex: 1,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: theme.colors.lightGrey,
  },
});
