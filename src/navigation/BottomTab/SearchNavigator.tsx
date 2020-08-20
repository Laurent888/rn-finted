import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SearchCategory from '@components/SearchCategory';

import { StackSearchParamsList } from '@routeTypes';
import ListingsScreen from '@screens/ListingsScreen';

const Stack = createStackNavigator<StackSearchParamsList>();

const SearchNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="searchHome" component={SearchCategory} />
      <Stack.Screen name="listings" component={ListingsScreen} />
    </Stack.Navigator>
  );
};

export default SearchNavigator;
