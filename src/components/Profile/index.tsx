import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useQuery, useApolloClient } from '@apollo/client';
import theme from '@theme';
import { GET_ME, IS_LOGGED_IN, GET_CURRENT_USER } from '@constants/queries';
import { useNavigation } from '@react-navigation/native';

import ButtonWide from '../../components/common/ButtonWide';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import Error from '../../components/common/Error';
import { Screens } from '@routeTypes';

const Profile = () => {
  const client = useApolloClient();
  const { data, loading, error } = useQuery(GET_ME, {
    fetchPolicy: 'network-only',
  });

  const n = useNavigation();

  if (loading) return <LoadingIndicator />;
  if (error) return <Error error={error} />;

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
  console.log(me, 'IN PROFILE');
  return (
    <ScrollView>
      <View style={s.container}>
        <TouchableOpacity style={s.profileBtn}>
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

      <View style={s.container}>
        <ButtonWide label="Favorite items" onPress={() => console.log('')} />
        <ButtonWide label="Personalisation" onPress={() => console.log('')} />
        <ButtonWide label="Balance" onPress={() => console.log('')} />
        <ButtonWide label="My orders" onPress={() => console.log('')} />
        <ButtonWide label="Bundle discounts" onPress={() => console.log('')} />
      </View>

      <View style={s.container}>
        <ButtonWide label="Forum" onPress={() => console.log('')} />
      </View>

      <View style={s.container}>
        <ButtonWide label="Invite friends" onPress={() => console.log('')} />
      </View>
      <View style={s.container}>
        <ButtonWide label="Holiday mode" onPress={() => console.log('')} />
      </View>
      <View style={s.container}>
        <ButtonWide label="Settings" onPress={() => n.navigate(Screens.SETTINGS)} />
        <ButtonWide label="About Finted" onPress={() => console.log('')} />
        <ButtonWide label="Help center" onPress={() => console.log('')} />
      </View>
    </ScrollView>
  );
};

export default Profile;

const s = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    marginBottom: 10,
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
