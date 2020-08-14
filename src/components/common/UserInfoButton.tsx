import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import theme from '@theme';

interface Props {
  onPress: () => void;
  username: string;
}

const profilePicMock =
  'https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60';

const UserInfoButton = ({ onPress, username }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={s.userInfo}>
        <View style={s.avatar}>
          <Avatar.Image size={40} source={{ uri: profilePicMock }} />
        </View>
        <View>
          <Text>{username}</Text>
          <Text>Stars</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserInfoButton;

const s = StyleSheet.create({
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: theme.colors.white,
    paddingVertical: 15,
    paddingHorizontal: theme.padding.container,
    borderBottomColor: theme.colors.lightGrey,
    borderBottomWidth: 1,
  },
  avatar: {
    marginRight: 15,
  },
});
