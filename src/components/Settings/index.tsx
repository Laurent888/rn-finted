import React from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { useApolloClient, ApolloClient } from '@apollo/client';
import { IS_LOGGED_IN, GET_CURRENT_USER } from '@constants/queries';

import ButtonWide from '../../components/common/ButtonWide';
import { logout } from '../../lib/utils';

const Settings = () => {
  const n = useNavigation();
  const client: ApolloClient<any> = useApolloClient();

  const handleLogOut = async () => {
    await logout();
    await client.writeQuery({
      query: IS_LOGGED_IN,
      data: {
        isLoggedIn: false,
      },
    });
    await client.writeQuery({
      query: GET_CURRENT_USER,
      data: {
        getCurrentUser: {
          id: '',
          email: '',
          username: '',
        },
      },
    });
    n.dispatch(StackActions.replace('root'));
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
