import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView as WebViewRaw } from 'react-native-webview';
import { useRoute, useNavigation, StackActions, CommonActions } from '@react-navigation/native';

import { useLazyQuery } from '@apollo/client';
import { CONFIRM_ORDER } from '@constants/queries';
import { Screens, TabNavigator } from '@routeTypes';
import { Button } from 'react-native-paper';

const uri = 'https://api.playground.klarna.com/';

const regexConfirmUrl = /^https/;

const Webview = () => {
  const {
    params: { checkout },
    name,
  } = useRoute();

  const navigation = useNavigation();

  if (name === Screens.PAYMENT_WEBVIEWCONFIRM) {
    navigation.setOptions({
      headerShown: false,
    });
  }

  const { html_snippet } = checkout;
  const webviewRef = useRef<any>(null);

  const [confirmOrderQuery] = useLazyQuery(CONFIRM_ORDER, {
    onCompleted({ confirmOrder }) {
      console.log('Confirm order');

      navigation.navigate(Screens.PAYMENT_WEBVIEWCONFIRM, { checkout: confirmOrder });
    },
  });

  const onNavigationStateChange = (navstate: any) => {
    if (navstate.url.match(regexConfirmUrl)) {
      webviewRef.current.stopLoading();

      const orderId = navstate.url.split('=')[1];
      getOrderConfirmation(orderId);
    }
  };

  const getOrderConfirmation = (orderId: string) => {
    confirmOrderQuery({ variables: { orderId } });
  };

  const renderBackButton = (name: string) => {
    if (name === Screens.PAYMENT_WEBVIEWCONFIRM) {
      return (
        <View style={{ paddingVertical: 20, alignItems: 'center', marginTop: 50 }}>
          <Button
            mode="contained"
            labelStyle={{ color: '#fff' }}
            onPress={() => {
              navigation.dispatch(StackActions.popToTop());
              navigation.navigate(TabNavigator.HOME_TAB, { screen: Screens.NEWSFEED });
            }}
          >
            Back to Listings
          </Button>
        </View>
      );
    } else {
      return;
    }
  };

  return (
    <View style={s.container}>
      <View style={s.contentContainer}>
        {renderBackButton(name)}
        <WebViewRaw
          originWhitelist={['*']}
          onNavigationStateChange={onNavigationStateChange}
          source={{ html: `${html_snippet}` }}
          ref={webviewRef}
        />
      </View>
    </View>
  );
};

export default Webview;

const s = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  contentContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
  },
});
