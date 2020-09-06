import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useApolloClient, ApolloClient } from '@apollo/client';
import { IS_LOGGED_IN } from '@constants/queries';

import Box from '@components/common/Box';
import { Screens, TabNavigator } from '@routeTypes';

import ButtonWide from '../common/ButtonWide';
import { logout } from '../../lib/utils';

const Settings = () => {
  const n = useNavigation();
  const client: ApolloClient<any> = useApolloClient();

  const handleLogOut = async () => {
    console.log('************** LOGGING OUT *************');
    client.writeQuery({
      query: IS_LOGGED_IN,
      data: {
        isLoggedIn: false,
      },
    });
    console.log('Written login false');

    n.dispatch(CommonActions.reset({ index: 0, routes: [{ name: TabNavigator.HOME_TAB }] }));
    await logout();

    await client.clearStore();
    await client.resetStore();
  };

  return (
    <ScrollView>
      <Box>
        <ButtonWide label="Profile details" onPress={() => n.navigate(Screens.EDIT_PROFILE)} />
        <ButtonWide label="Payments" />
        <ButtonWide label="Postage" />
        <ButtonWide label="Security" />
      </Box>
      <Box>
        <ButtonWide label="Log out" onPress={handleLogOut} />
      </Box>
    </ScrollView>
  );
};

export default Settings;
