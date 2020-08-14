import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Screens } from '@routeTypes';

import Newsfeed from '@screens/Newsfeed';
import ListingScreen from '@screens/ListingScreen';
import OtherProfile from '@components/OtherProfile';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
    >
      <Stack.Screen name={Screens.NEWSFEED} component={Newsfeed} />
      <Stack.Screen name={Screens.LISTING} component={ListingScreen} />
      <Stack.Screen name={Screens.OTHER_PROFILE} component={OtherProfile} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
