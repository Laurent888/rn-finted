import React from 'react';
import { Text } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import theme from '@theme';
import Box from './Box';

interface Props {
  price: string | number;
  size?: number;
  color?: string;
  padding?: [number, number];
}

const Price = ({ price, size = 16, color = '#444', padding = [0, 0] }: Props) => {
  return (
    <Box flexDirection="row" alignItems="center" justifyContent="flex-start" px={[5, 9]}>
      <Text style={{ fontSize: size, color }}>{price}</Text>
      <Icon name="euro-symbol" size={size} color={color} style={{ paddingTop: 2 }} />
    </Box>
  );
};

Price.defaultProps = {
  size: 16,
  color: theme.colors.darkGrey,
  style: null,
  padding: [0, 0],
};

export default Price;
