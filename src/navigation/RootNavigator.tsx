import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

import { useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '@constants/queries';

import { TabNavigator, Screens } from '@routeTypes';

import HomeNavigator from './BottomTab/HomeNavigator';
import ProfileNavigator from './BottomTab/ProfileNavigator';
import SellNavigator from './BottomTab/SellNavigator';
import SearchNavigator from './BottomTab/SearchNavigator';

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  const t = useTheme();

  const { data } = useQuery(IS_LOGGED_IN);
  console.log('In root navigator, Is logged in: ', data);

  const listenersTab = (navigation: any, tab: string, screen: string) => ({
    tabPress: (e) => {
      e.preventDefault();
      if (!data.isLoggedIn) {
        navigation.navigate('loginModal');
      } else {
        navigation.navigate(tab, {
          screen,
        });
      }
    },
  });

  const getRouteNameVisible = (route) => {
    const routeIndex = route.state ? route.state.index : null;

    if (!routeIndex) return true;
    const routeName = route.state.routes[routeIndex].name;

    if (routeName === Screens.EDIT_PROFILE) {
      return false;
    }

    return true;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'star-four-points';

          if (route.name === TabNavigator.HOME_TAB) {
            iconName = focused ? 'home-variant' : 'home-variant-outline';
          } else if (route.name === TabNavigator.SEARCH_TAB) {
            iconName = focused ? 'feature-search' : 'feature-search-outline';
          } else if (route.name === TabNavigator.SELL_TAB) {
            iconName = focused ? 'plus-box' : 'plus-box-outline';
          } else if (route.name === TabNavigator.INBOX_TAB) {
            iconName = focused ? 'message' : 'message-outline';
          } else if (route.name === TabNavigator.PROFILE_TAB) {
            iconName = focused ? 'shield-account' : 'shield-account-outline';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: t.colors.primary,
        inactiveTintColor: t.colors.lightGrey,
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen name={TabNavigator.HOME_TAB} component={HomeNavigator} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name={TabNavigator.SEARCH_TAB} component={SearchNavigator} options={{ tabBarLabel: 'Search' }} />
      <Tab.Screen name={TabNavigator.SELL_TAB} component={SellNavigator} options={{ tabBarLabel: 'Sell' }} />
      <Tab.Screen
        name={TabNavigator.INBOX_TAB}
        component={HomeNavigator}
        options={{ tabBarLabel: 'Inbox' }}
        listeners={({ navigation }) => listenersTab(navigation, TabNavigator.HOME_TAB, Screens.HOME)}
      />
      <Tab.Screen
        name={TabNavigator.PROFILE_TAB}
        component={ProfileNavigator}
        options={({ route }) => {
          return { tabBarLabel: 'Profile', tabBarVisible: getRouteNameVisible(route) };
        }}
        listeners={({ navigation }) => listenersTab(navigation, TabNavigator.PROFILE_TAB, Screens.PROFILE)}
      />
    </Tab.Navigator>
  );
};

export default RootNavigator;
