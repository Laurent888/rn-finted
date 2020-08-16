import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Ionicons as Icon } from '@expo/vector-icons';
import theme from '@theme';
import Box from './Box';

interface Props {
  onPress: () => void;
  username: string;
}

const profilePicMock =
  'https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60';

const UserInfoButton = ({ onPress, username }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box flexDirection="row" justifyContent="space-between" px={[15, 15]} style={s.userInfo}>
        <Box flexDirection="row" justifyContent="flex-start" py={[15, 15]}>
          <Box mx={[0, 15]}>
            <Avatar.Image size={40} source={{ uri: profilePicMock }} />
          </Box>

          <Box>
            <Text>{username}</Text>
            <Text>Stars</Text>
          </Box>
        </Box>

        <Box alignItems="center">
          <Icon name="ios-arrow-forward" size={20} />
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default UserInfoButton;

const s = StyleSheet.create({
  userInfo: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.padding.container,
    borderBottomColor: theme.colors.lightGrey,
    borderBottomWidth: 1,
  },
});
