import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import theme from '@theme';
import { Screens, StackSearchParamsList } from '@routeTypes';
import SearchBarHeader from '@components/common/SearchBarHeader';

import TabCategoryList from './TabCategoryList';

const Tab = createMaterialTopTabNavigator();

type NavProps = NavigationProp<StackSearchParamsList, 'searchHome'>;

// SEARCH CATEGORY

const SearchCategory = () => {
  const navigation = useNavigation<NavProps>();

  const [searchValue, setSearchValue] = useState('');

  navigation.setOptions({
    header: () => (
      <SearchBarHeader
        onChangeText={(text) => setSearchValue(text)}
        onSubmitEditing={navigateToListings}
        value={searchValue}
      />
    ),
  });

  const navigateToListings = () => {
    if (searchValue !== '') {
      navigation.navigate(Screens.LISTINGS, { keyword: searchValue });
    }
  };

  const selectCategory = (category: string) => {
    navigation.navigate(Screens.LISTINGS, { keyword: category });
  };

  return (
    <Tab.Navigator tabBarOptions={{ indicatorStyle: { backgroundColor: theme.colors.primary, height: 4 } }}>
      <Tab.Screen name="women">
        {(props) => <TabCategoryList {...props} categoryType="women" onPress={() => selectCategory('women')} />}
      </Tab.Screen>
      <Tab.Screen name="men">
        {(props) => <TabCategoryList {...props} categoryType="men" onPress={() => selectCategory('men')} />}
      </Tab.Screen>
      <Tab.Screen name="kids">
        {(props) => <TabCategoryList {...props} categoryType="kids" onPress={() => selectCategory('kids')} />}
      </Tab.Screen>
      <Tab.Screen name="home">
        {(props) => <TabCategoryList {...props} categoryType="home" onPress={() => selectCategory('home')} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default SearchCategory;
