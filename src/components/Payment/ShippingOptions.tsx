import React from 'react';
import { Text, Image } from 'react-native';
import { RadioButton } from 'react-native-paper';

import s from './styles';
import Box from '@components/common/Box';
import theme from '@theme';

export interface OptionProps {
  id: string;
  price: number;
}

interface ShippingOptionsProps {
  value: OptionProps;
  setValue: (option: OptionProps) => void;
}

const ShippingOptionsData = [
  {
    id: 'ups',
    name: 'UPS',
    price: 3.7,
    logo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UPS_Logo_Shield_2017.svg/859px-UPS_Logo_Shield_2017.svg.png',
  },
  {
    id: 'dhl',
    name: 'DHL',
    price: 4.9,
    logo: 'https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/4895191d96e9c9e6e3b10230e806f3de',
  },
  {
    id: 'postnord',
    name: 'PostNord',
    price: 2.5,
    logo: 'https://www.postnord.se/globalassets/scaledimages/postnord-logo-2560x1080_1250x528_90.jpg',
  },
];

const ShippingOptions = ({ value, setValue }: ShippingOptionsProps) => {
  return (
    <Box stretch py={[15, 10]}>
      <Text style={[s.title, { paddingBottom: 10 }]}>Shipping Options</Text>
      {ShippingOptionsData.map((option) => (
        <Box
          key={option.id}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          py={[15, 15]}
          stretch
          style={s.shippingOptionRow}
        >
          <Box flexDirection="row" alignItems="center">
            <Image source={{ uri: option.logo }} resizeMode="contain" style={s.shippingLogo} />

            <Box py={[0, 4]}>
              <Text>{option.name}</Text>
              <Text style={s.shippingPrice}>{`${option.price}€`}</Text>
            </Box>
          </Box>

          <RadioButton
            value={option.id}
            onPress={() => setValue({ id: option.id, price: option.price })}
            status={value.id === option.id ? 'checked' : 'unchecked'}
            color={theme.colors.primary}
          />
        </Box>
      ))}
    </Box>
  );
};

export default ShippingOptions;
