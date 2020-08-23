import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '@routeTypes';
import PaymentScreen from '@screens/PaymentScreen';
import PaymentOptionsScreen from '@screens/PaymentOptionsScreen';

const Stack = createStackNavigator();

const PaymentNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Screens.PAYMENT} component={PaymentScreen} />
      <Stack.Screen name={Screens.PAYMENT_OPTIONS} component={PaymentOptionsScreen} />
    </Stack.Navigator>
  );
};

export default PaymentNavigator;

const styles = StyleSheet.create({});
