import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import theme from '@theme';

interface Props {
  price: string | number;
  size?: number;
  color?: string;
  padding?: [number, number];
}

const Price = ({ price, size = 16, color = '#444', padding = [0, 0] }: Props) => {
  return (
    <View style={[s.container, { paddingLeft: padding[0], paddingRight: padding[1] }]}>
      <Text style={{ fontSize: size, color }}>{price}</Text>
      <Icon name="euro-symbol" size={size} color={color} style={{ paddingTop: 2 }} />
    </View>
  );
};

Price.defaultProps = {
  size: 16,
  color: theme.colors.darkGrey,
  style: null,
  padding: [0, 0],
};

export default Price;

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
