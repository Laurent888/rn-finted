import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchCategory from '@components/SearchCategory';

export type StackSearchParamsList = {
  searchHome: undefined;
};

const Stack = createStackNavigator<StackSearchParamsList>();

const SearchNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="searchHome" component={SearchCategory} />
    </Stack.Navigator>
  );
};

export default SearchNavigator;
