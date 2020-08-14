import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import RootNavigator from './RootNavigator';
import LoginNavigator from './LoginNavigator';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen name="root" component={RootNavigator} options={{ headerShown: false }} />
        <Stack.Screen
          name="loginModal"
          component={LoginNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
