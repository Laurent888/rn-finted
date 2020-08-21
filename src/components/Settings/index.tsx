import React from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation, StackActions, CommonActions } from '@react-navigation/native';
import { useApolloClient, ApolloClient } from '@apollo/client';
import { IS_LOGGED_IN, GET_CURRENT_USER } from '@constants/queries';

import ButtonWide from '../../components/common/ButtonWide';
import { logout } from '../../lib/utils';
import { Screens, TabNavigator } from '@routeTypes';
import { logoutReset } from '../../lib/apollo';

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
      <View>
        <ButtonWide label="Profile details" />
        <ButtonWide label="Payments" />
        <ButtonWide label="Postage" />
        <ButtonWide label="Security" />
      </View>
      <View>
        <ButtonWide label="Log out" onPress={handleLogOut} />
      </View>
    </ScrollView>
  );
};

export default Settings;
