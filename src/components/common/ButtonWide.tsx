import React from 'react';
import { StyleSheet, Text, Dimensions, TouchableOpacity, View } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import theme from '@theme';
import Box from './Box';

interface Props {
  label: string;
  desc?: string;
  onPress?: () => void;
}

interface CustomButtonProps {
  children: React.ReactNode;
  style: any;
  onPress?: () => void;
}

const WIDTH = Dimensions.get('screen').width;

const CustomButton = ({ children, onPress, style, ...props }: CustomButtonProps) => {
  if (onPress) {
    return (
      <TouchableOpacity {...props} onPress={onPress} style={style}>
        {children}
      </TouchableOpacity>
    );
  } else {
    return (
      <View {...props} style={style}>
        {children}
      </View>
    );
  }
};

const ButtonWide = ({ label, desc, onPress }: Props) => {
  return (
    <CustomButton style={s.button} onPress={onPress}>
      <Text style={s.label}>{label}</Text>

      <Box flexDirection="row">
        <Text style={[s.desc, { marginRight: onPress ? 10 : 0 }]}>{desc}</Text>
        {onPress && <Icon name="ios-arrow-forward" size={24} color={theme.colors.mediumGrey} />}
      </Box>
    </CustomButton>
  );
};

export default ButtonWide;

const s = StyleSheet.create({
  button: {
    width: WIDTH,
    paddingVertical: theme.padding.large,
    paddingHorizontal: theme.padding.large,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: theme.colors.lightGrey,
    borderBottomWidth: 0.5,
    backgroundColor: theme.colors.white,
  },
  label: {
    fontSize: theme.fontSize.normal,
    color: theme.colors.black,
    fontWeight: '600',
  },
  desc: {
    fontSize: theme.fontSize.normal,
    color: theme.colors.darkGrey,
    textTransform: 'capitalize',
  },
});
