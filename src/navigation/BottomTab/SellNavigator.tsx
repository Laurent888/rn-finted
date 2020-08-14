import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '@routeTypes';
import { useQuery, gql } from '@apollo/client';
import { View, Text } from 'react-native';

import LoginScreen from '@screens/LoginScreen';
import SellScreen from '@screens/SellScreen';

const Stack = createStackNavigator();

const SellNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Screen name={Screens.SELL} component={SellScreen} />
      ) : (
        <Stack.Screen name={Screens.LOGIN} component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default SellNavigator;
