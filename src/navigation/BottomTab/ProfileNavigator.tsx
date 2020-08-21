import React, { useEffect } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useQuery } from '@apollo/client';

import ProfileScreen from '@screens/ProfileScreen';
import NotLoggedInScreen from '@screens/NotLoggedInScreen';
import SettingsScreen from '@screens/SettingsScreen';
import OtherProfile from '@components/OtherProfile';

import { Screens } from '@routeTypes';

import { IS_LOGGED_IN } from '../../constant/queries';
import LoginNavigator from '../LoginNavigator';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  const { data, refetch } = useQuery(IS_LOGGED_IN);
  console.log('In Profile Navigator', data);

  useEffect(() => {
    refetch();
  }, []);

  if (!data || data.isLoggedIn === false) {
    return <LoginNavigator />;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name={Screens.PROFILE} component={ProfileScreen} />
      <Stack.Screen name={Screens.SETTINGS} component={SettingsScreen} />
      <Stack.Screen name={Screens.OTHER_PROFILE} component={OtherProfile} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
