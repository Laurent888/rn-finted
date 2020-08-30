import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '@routeTypes';
import PaymentScreen from '@screens/PaymentScreen';
import PaymentOptionsScreen from '@screens/PaymentOptionsScreen';
import WebViewPayments from '@screens/WebViewPayments';

const Stack = createStackNavigator();

const PaymentNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Screens.PAYMENT} component={PaymentScreen} />
      <Stack.Screen name={Screens.PAYMENT_OPTIONS} component={PaymentOptionsScreen} />
      <Stack.Screen name={Screens.PAYMENT_WEBVIEW} component={WebViewPayments} />
      <Stack.Screen name={Screens.PAYMENT_WEBVIEWCONFIRM} component={WebViewPayments} />
    </Stack.Navigator>
  );
};

export default PaymentNavigator;

const styles = StyleSheet.create({});
