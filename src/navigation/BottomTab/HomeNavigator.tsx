import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { Screens } from '@routeTypes';

import Newsfeed from '@screens/Newsfeed';
import ListingScreen from '@screens/ListingScreen';
import OtherProfile from '@components/OtherProfile';

const Stack = createStackNavigator();
const SharedStack = createSharedElementStackNavigator();

const HomeNavigator = () => {
  return (
    <SharedStack.Navigator
      screenOptions={{
        // CardInterpolator: Allows the transition page to be horizontal on iOS
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitleStyle: { textTransform: 'capitalize' },
      }}
    >
      <SharedStack.Screen name={Screens.NEWSFEED} component={Newsfeed} />
      <SharedStack.Screen
        name={Screens.LISTING}
        component={ListingScreen}
        sharedElements={(route) => {
          const { id } = route.params;
          return [`card-cover-${id}`];
        }}
      />
      <SharedStack.Screen name={Screens.OTHER_PROFILE} component={OtherProfile} />
    </SharedStack.Navigator>
  );
};

export default HomeNavigator;
