import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { Text } from 'react-native';

import Box from '@components/common/Box';
import { Button } from 'react-native-paper';

import s from './styles';
import theme from '@theme';

interface PaymentConfirmationBoxProps {
  n: NavigationProp<any, any>;
  onPress: () => void;
}

const PaymentConfirmationBox = ({ n, onPress }: PaymentConfirmationBoxProps) => {
  return (
    <Box stretch alignItems="center" justifyContent="center" py={[5, 20]} style={s.paymentConfirmationContainer}>
      <Text style={s.caption}>This is a secure payment</Text>
      <Button onPress={onPress} mode="contained" color={theme.colors.success} style={{ width: '80%' }}>
        Pay
      </Button>
    </Box>
  );
};

export default PaymentConfirmationBox;
