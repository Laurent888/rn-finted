import React, { useState } from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import Box from '@components/common/Box';
import theme from '@theme';
import { RadioButton } from 'react-native-paper';

const paymentServicesData = [
  {
    id: 'klarna',
    name: 'Klarna',
    logo: 'https://pbs.twimg.com/profile_images/1130808184384425984/ksu9xTZM_400x400.png',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    logo: 'https://paganresearch.io/images/Stripe.jpg',
  },
];

interface PaymentProps {
  value: string;
  setValue: (id: string) => void;
}

const PaymentsServices = ({ value, setValue }: PaymentProps) => {
  return (
    <>
      {paymentServicesData.map((option) => (
        <TouchableOpacity key={option.id} activeOpacity={1} onPress={() => setValue(option.id)}>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            px={[15, 15]}
            py={[15, 15]}
            style={{ borderBottomColor: theme.colors.lightGrey, borderBottomWidth: 0.5 }}
            stretch
          >
            <Box flexDirection="row" alignItems="center">
              <Image
                source={{ uri: option.logo }}
                resizeMode="contain"
                style={{ width: 50, height: 35, marginRight: 5, borderRadius: 5 }}
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
        </TouchableOpacity>
      ))}
    </>
  );
};

const PaymentOptions = () => {
  const [bank, setBank] = useState('');

  return (
    <Box stretch style={{ backgroundColor: theme.colors.white }}>
      <PaymentsServices value={bank} setValue={setBank} />
    </Box>
  );
};

export default PaymentOptions;
