import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useQuery } from '@apollo/client';

import ProfileScreen from '@screens/ProfileScreen';
import NotLoggedInScreen from '@screens/NotLoggedInScreen';
import SettingsScreen from '@screens/SettingsScreen';

import { Screens } from '@routeTypes';

import { IS_LOGGED_IN } from '../../constant/queries';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import Error from '../../components/common/Error';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  const { data, loading, error } = useQuery(IS_LOGGED_IN);

  if (loading) return <LoadingIndicator />;
  if (error) return <Error error={error} />;

  return (
    <Stack.Navigator>
      <Stack.Screen name={Screens.PROFILE} component={ProfileScreen} />
      <Stack.Screen name={Screens.SETTINGS} component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
