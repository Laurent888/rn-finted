import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from '@theme';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import Button from '../common/Button';
import Price from '@components/common/Price';
import Box from '@components/common/Box';

interface Props {
  title: string;
  price: number;
  handleBuy: () => void;
  currentUser: boolean;
}

const ListingHeader = ({ title, price, handleBuy, currentUser }: Props) => {
  return (
    <View style={s.container}>
      <View>
        <Text>{title}</Text>
        <Text style={s.condition}>Condition</Text>
        <Price price={price} />
      </View>

      {!currentUser && (
        <View style={s.buttons}>
          <Button mode="outlined" style={{ marginBottom: 20 }}>
            Ask Seller
          </Button>

          <Button mode="contained" onPress={handleBuy}>
            Buy Now
          </Button>
        </View>
      )}

      <Box flexDirection="row" alignItems="center" py={[15, 30]}>
        <View style={s.iconContainer}>
          <Icon name="shield-check" size={40} color={theme.colors.primary} />
        </View>
        <View>
          <Text>Be covered by our refund policy</Text>
          <Text>Learn more about Buyer Protection</Text>
        </View>
      </Box>

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
