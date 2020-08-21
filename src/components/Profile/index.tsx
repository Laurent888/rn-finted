import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { useQuery, useApolloClient } from '@apollo/client';
import theme from '@theme';
import { GET_ME, IS_LOGGED_IN, GET_CURRENT_USER } from '@constants/queries';
import { useNavigation, CommonActions } from '@react-navigation/native';

import { Screens, TabNavigator } from '@routeTypes';
import Box from '@components/common/Box';
import ButtonWide from '../../components/common/ButtonWide';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import Error from '../../components/common/Error';

const Profile = () => {
  console.log('In Profile screen');
  const client = useApolloClient();
  const n = useNavigation();

  const { data, loading, error } = useQuery(GET_ME, {
    fetchPolicy: 'cache-first',
  });

  const { data: lData } = useQuery(IS_LOGGED_IN);

  if (loading) return <LoadingIndicator />;
  if (error) {
    return <Error />;
  }

  console.log('In Profile Screen, Is Logged in', lData, 'GetMe data', data);

  const { me } = data;
  client.writeQuery({
    query: GET_CURRENT_USER,
    data: {
      getCurrentUser: {
        email: me.email,
        id: me.id,
        username: me.username,
      },
    },
  });
  console.log(me.username, 'IN PROFILE');
  return (
    <ScrollView>
      <View style={s.container}>
        <TouchableOpacity
          style={s.profileBtn}
          onPress={() => n.navigate(Screens.OTHER_PROFILE, { ownerId: me.id, username: me.username })}
        >
          <View style={s.avatar}>
            <Avatar.Image
              source={{
                uri:
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Brad_Pitt_2019_by_Glenn_Francis.jpg/1200px-Brad_Pitt_2019_by_Glenn_Francis.jpg',
              }}
              size={45}
            />
          </View>
          <View>
            <Text>{me.username}</Text>
            <Text style={s.viewProfile}>View my profile</Text>
          </View>
        </TouchableOpacity>

        <ButtonWide label="Your guide to Finted" onPress={() => console.log('')} />
      </View>

      <Box my={[0, 10]} style={s.container}>
        <ButtonWide label="Favorite items" onPress={() => console.log('')} />
        <ButtonWide label="Personalisation" onPress={() => console.log('')} />
        <ButtonWide label="Balance" onPress={() => console.log('')} />
        <ButtonWide label="My orders" onPress={() => console.log('')} />
        <ButtonWide label="Bundle discounts" onPress={() => console.log('')} />
      </Box>

      <Box my={[0, 10]} style={s.container}>
        <ButtonWide label="Forum" onPress={() => console.log('')} />
      </Box>

      <Box my={[0, 10]} style={s.container}>
        <ButtonWide label="Invite friends" onPress={() => console.log('')} />
      </Box>
      <Box my={[0, 10]} style={s.container}>
        <ButtonWide label="Holiday mode" onPress={() => console.log('')} />
      </Box>
      <Box my={[0, 10]} style={s.container}>
        <ButtonWide label="Settings" onPress={() => n.navigate(Screens.SETTINGS)} />
        <ButtonWide label="About Finted" onPress={() => console.log('')} />
        <ButtonWide label="Help center" onPress={() => console.log('')} />
      </Box>
    </ScrollView>
  );
};

export default Profile;

const s = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
  },
  profileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.padding.large,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.lightGrey,
  },
  avatar: {
    marginRight: 10,
  },
  viewProfile: {
    color: theme.colors.mediumGrey,
  },
});
