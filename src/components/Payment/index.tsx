import React, { useState } from 'react';
import { Text, View, ScrollView, Image, StyleSheet } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { GET_LISTING } from '@constants/queries';

import { MaterialCommunityIcons as MIcon } from '@expo/vector-icons';
import { RadioButton, Button } from 'react-native-paper';
import theme from '@theme';

import Box from '@components/common/Box';
import LoadingIndicator from '@components/common/LoadingIndicator';
import Error from '@components/common/Error';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Screens } from '@routeTypes';

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

interface ShippingOptionsProps {
  value: string;
  setValue: () => void;
}

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
          style={{ borderBottomWidth: 0.5, borderBottomColor: theme.colors.lightGrey }}
        >
          <Box flexDirection="row" alignItems="center">
            <Image
              source={{ uri: option.logo }}
              resizeMode="contain"
              style={{ width: 50, height: 35, marginRight: 10, borderRadius: 5 }}
            />
            <Text>{option.name}</Text>
          </Box>

          <RadioButton
            value={option.id}
            onPress={() => setValue(option.id)}
            status={value === option.id ? 'checked' : 'unchecked'}
            color={theme.colors.primary}
          />
        </Box>
      ))}
    </Box>
  );
};

const PaymentConfirmationBox = () => {
  return (
    <Box
      stretch
      alignItems="center"
      justifyContent="center"
      py={[5, 20]}
      style={{
        backgroundColor: theme.colors.white,
        borderTopColor: theme.colors.lightGrey,
        borderTopWidth: 0.5,
        elevation: 5,
      }}
    >
      <Text style={s.caption}>This is a secure payment</Text>
      <Button mode="contained" color={theme.colors.success} style={{ width: '80%' }}>
        Pay
      </Button>
    </Box>
  );
};

const Payment = () => {
  const { params } = useRoute<RouteProp<any, any>>();
  const n = useNavigation();

  const [shippingOption, setShippingOption] = useState('');

  const { data, loading, error } = useQuery(GET_LISTING, {
    variables: {
      id: params.id,
    },
  });

  const navigateToPaymentMethod = () => n.navigate(Screens.PAYMENT_OPTIONS);

  if (loading) return <LoadingIndicator />;
  if (error) return <Error />;

  const {
    getListing: { id, title, description, price, images, category },
  } = data;

  return (
    <>
      <ScrollView style={{ width: '100%', height: '100%' }}>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: theme.colors.white,
            paddingHorizontal: 15,
            paddingBottom: 10,
          }}
        >
          <Box py={[40, 40]} alignItems="center">
            <Box style={{ height: 200, width: 150 }}>
              <Image source={{ uri: images[0] }} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
            </Box>
          </Box>
          <Box style={{ borderBottomColor: theme.colors.lightGrey, borderBottomWidth: 0.5 }}>
            <Box stretch flexDirection="row" alignItems="center" justifyContent="space-between" py={[0, 10]}>
              <Text style={[s.text, s.mediumGrey]}>Price</Text>
              <Text style={[s.text, s.mediumGrey]}>{`${price} €`}</Text>
            </Box>
            <Box stretch flexDirection="row" alignItems="center" justifyContent="space-between" py={[0, 10]}>
              <Text style={[s.text, s.mediumGrey]}>Postage</Text>
              <Text style={[s.text, s.mediumGrey]}>4 €</Text>
            </Box>
            <Box stretch flexDirection="row" alignItems="center" justifyContent="space-between" py={[0, 10]}>
              <Text style={s.text}>Total</Text>
              <Text style={s.text}>{`${price + 4} €`}</Text>
            </Box>
          </Box>
          <Box stretch py={[10, 10]} style={{ borderBottomColor: theme.colors.lightGrey, borderBottomWidth: 0.5 }}>
            <Text style={s.title}>Address</Text>
            <TouchableOpacity onPress={navigateToPaymentMethod} style={{ width: '100%' }}>
              <Box py={[6, 0]} flexDirection="row" justifyContent="space-between" alignItems="center" stretch>
                <Text style={s.text}>Add your shipping address</Text>
                <MIcon name="plus" size={25} />
              </Box>
            </TouchableOpacity>
          </Box>

          <Box stretch py={[10, 10]} style={{ borderBottomColor: theme.colors.lightGrey, borderBottomWidth: 0.5 }}>
            <Text style={s.title}>Payment</Text>
            <TouchableOpacity onPress={navigateToPaymentMethod} style={{ width: '100%' }}>
              <Box py={[6, 0]} flexDirection="row" justifyContent="space-between" alignItems="center" stretch>
                <Text style={s.text}>Choose your payment method</Text>
                <MIcon name="plus" size={25} />
              </Box>
            </TouchableOpacity>
          </Box>
          {/* Shipping options */}
          <ShippingOptions value={shippingOption} setValue={setShippingOption} />
        </View>
      </ScrollView>

      <PaymentConfirmationBox />
    </>
  );
};

const s = StyleSheet.create({
  title: {
    fontSize: theme.fontSize.normal,
    fontWeight: '600',
    color: theme.colors.mediumGrey,
  },
  text: {
    fontSize: theme.fontSize.normal,
  },
  mediumGrey: {
    color: theme.colors.mediumGrey,
  },
  caption: {
    fontSize: theme.fontSize.caption,
    color: theme.colors.mediumGrey,
    paddingVertical: 6,
  },
});

export default Payment;
