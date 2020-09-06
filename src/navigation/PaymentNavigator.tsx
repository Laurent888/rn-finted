import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '@routeTypes';
import PaymentScreen from '@screens/PaymentScreen';
import PaymentOptionsScreen from '@screens/PaymentOptionsScreen';
import WebViewPayments from '@screens/WebViewPayments';

const Stack = createStackNavigator();

const PaymentNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Screens.PAYMENT} component={PaymentScreen} options={{ headerTitle: 'Payment' }} />
      <Stack.Screen
        name={Screens.PAYMENT_OPTIONS}
        component={PaymentOptionsScreen}
        options={{ headerTitle: 'Payment options' }}
      />
      <Stack.Screen
        name={Screens.PAYMENT_WEBVIEW}
        component={WebViewPayments}
        options={{ headerTitle: 'Payment information' }}
      />
      <Stack.Screen name={Screens.PAYMENT_WEBVIEWCONFIRM} component={WebViewPayments} />
    </Stack.Navigator>
  );
};

export default PaymentNavigator;
