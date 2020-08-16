import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationProp } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import Box from '@components/common/Box';

import TabCategoryList from './TabCategoryList';
import { StackSearchParamsList } from '../../navigation/BottomTab/SearchNavigator';
import theme from '@theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Tab = createMaterialTopTabNavigator();

interface Props {
  navigation: NavigationProp<StackSearchParamsList, 'searchHome'>;
}

const SearchCategory = ({ navigation }: Props) => {
  const { top } = useSafeAreaInsets();

  navigation.setOptions({
    header: () => (
      <TouchableOpacity activeOpacity={0.9}>
        <Box
          py={[top + 10, 10]}
          px={[20, 20]}
          style={{ backgroundColor: '#fff', borderBottomColor: '#f4f4f4', borderBottomWidth: 1 }}
        >
          <Searchbar
            value=""
            placeholder="Search items"
            editable={false}
            style={{ elevation: 1, height: 40, backgroundColor: '#f4f4f4' }}
          />
        </Box>
      </TouchableOpacity>
    ),
  });

  return (
    <Tab.Navigator
      tabBarOptions={{ indicatorStyle: { backgroundColor: theme.colors.primary, height: 4 } }}
    >
      <Tab.Screen name="women">
        {(props) => <TabCategoryList {...props} categoryType="women" />}
      </Tab.Screen>
      <Tab.Screen name="men">
        {(props) => <TabCategoryList {...props} categoryType="men" />}
      </Tab.Screen>
      <Tab.Screen name="kids">
        {(props) => <TabCategoryList {...props} categoryType="kids" />}
      </Tab.Screen>
      <Tab.Screen name="home">
        {(props) => <TabCategoryList {...props} categoryType="home" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default SearchCategory;

const styles = StyleSheet.create({});
