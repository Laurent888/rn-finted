import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Screens } from "@routeTypes";

import Newsfeed from "@screens/Newsfeed";
import ListingScreen from "@screens/ListingScreen";

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Screens.NEWSFEED} component={Newsfeed} />
      <Stack.Screen name={Screens.LISTING} component={ListingScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
