import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Ionicons as Icon } from '@expo/vector-icons';
import theme from '@theme';
import { defaultProfilePicUrl } from '../../lib/utils';
import Box from './Box';

interface Props {
  onPress: () => void;
  username: string;
  userPicture: string;
}

const UserInfoButton = ({ onPress, username, userPicture }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box flexDirection="row" justifyContent="space-between" px={[15, 15]} style={s.userInfo}>
        <Box flexDirection="row" justifyContent="flex-start" py={[15, 15]}>
          <Box mx={[0, 15]}>
            <Avatar.Image size={40} source={{ uri: userPicture || defaultProfilePicUrl }} />
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
