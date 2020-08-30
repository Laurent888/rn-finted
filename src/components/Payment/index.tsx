import React, { useState } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useQuery, useMutation } from '@apollo/client';
import { GET_LISTING, CHECKOUT } from '@constants/queries';

import { MaterialCommunityIcons as MIcon } from '@expo/vector-icons';
import s from './styles';

import PaymentConfirmationBox from './PaymentConfirmationBox';
import ShippingOptions, { OptionProps } from './ShippingOptions';
import Box from '@components/common/Box';
import LoadingIndicator from '@components/common/LoadingIndicator';
import Error from '@components/common/Error';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Screens } from '@routeTypes';

interface KlarnaResponse {
  order_id: string;
  status: string;
  purchase_country: string;
  purchase_currency: string;
  order_amount: number;
  order_tax_amount: number;
  html_snippet: string;
}

interface ResCheckoutProps {
  checkout: KlarnaResponse;
}

const Payment = () => {
  const { params } = useRoute<RouteProp<any, any>>();
  const n = useNavigation();

  const [shippingOption, setShippingOption] = useState<OptionProps>({ id: 'postnord', price: 2.5 });
  const [paymentMethod, setPaymentMethod] = useState('');

  // GRAPHQL
  const { data, loading, error } = useQuery(GET_LISTING, {
    variables: {
      id: params.id,
    },
  });

  const [checkout] = useMutation(CHECKOUT, {
    onCompleted({ checkout }: ResCheckoutProps) {
      n.navigate(Screens.PAYMENT_WEBVIEW, { checkout });
    },
  });

  const navigateToPaymentMethod = () => n.navigate(Screens.PAYMENT_OPTIONS);

  if (loading) return <LoadingIndicator />;
  if (error) return <Error />;

  const {
    getListing: { id, title, description, price, images, category },
  } = data;

  // Handle submit
  const handleSubmit = () => {
    const itemOrder = setOrderData();

    checkout({ variables: { order: { title: itemOrder.name, totalPrice: itemOrder.totalPrice } } });
  };

  const navigateToWebview = () => {
    n.navigate(Screens.PAYMENT_WEBVIEW);
  };

  const setOrderData = () => {
    const totalPrice = price + shippingOption.price;

    const itemOrder = {
      name: title,
      totalPrice,
    };

    return itemOrder;
  };

  return (
    <>
      <ScrollView style={{ width: '100%', height: '100%' }}>
        <View style={s.container}>
          <Box py={[40, 40]} alignItems="center">
            <Box style={{ height: 200, width: 150 }}>
              <Image source={{ uri: images[0] }} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
            </Box>
          </Box>

          <Box style={s.borderBottomSection}>
            <Box stretch flexDirection="row" alignItems="center" justifyContent="space-between" py={[0, 10]}>
              <Text style={[s.text, s.mediumGrey]}>Price</Text>
              <Text style={[s.text, s.mediumGrey]}>{`${price} €`}</Text>
            </Box>
            <Box stretch flexDirection="row" alignItems="center" justifyContent="space-between" py={[0, 10]}>
              <Text style={[s.text, s.mediumGrey]}>Postage</Text>
              <Text style={[s.text, s.mediumGrey]}>{`${shippingOption?.price || 0}‎€`}</Text>
            </Box>
            <Box stretch flexDirection="row" alignItems="center" justifyContent="space-between" py={[0, 10]}>
              <Text style={s.text}>Total</Text>
              <Text style={s.text}>{`${price + shippingOption?.price} €`}</Text>
            </Box>
          </Box>

          <Box stretch py={[10, 10]} style={s.borderBottomSection}>
            <Text style={s.title}>Address</Text>
            <TouchableOpacity onPress={navigateToPaymentMethod} style={{ width: '100%' }}>
              <Box py={[6, 0]} flexDirection="row" justifyContent="space-between" alignItems="center" stretch>
                <Text style={s.text}>Add your shipping address</Text>
                <MIcon name="plus" size={25} />
              </Box>
            </TouchableOpacity>
          </Box>

          <Box stretch py={[10, 10]} style={s.borderBottomSection}>
            <Text style={s.title}>Payment</Text>
            <TouchableOpacity onPress={navigateToPaymentMethod} style={{ width: '100%' }}>
              <Box py={[6, 0]} flexDirection="row" justifyContent="space-between" alignItems="center" stretch>
                <Text style={s.text}>Choose your payment method</Text>
                <MIcon name="plus" size={25} />
              </Box>
            </TouchableOpacity>
          </Box>

          {/* Shipping options */}
          <ShippingOptions value={shippingOption} setValue={(option) => setShippingOption(option)} />
        </View>
      </ScrollView>

      {/* Payment Confirmation */}
      <PaymentConfirmationBox n={n} onPress={handleSubmit} />
    </>
  );
};

export default Payment;
