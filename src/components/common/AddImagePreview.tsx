import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import theme from '@theme';

const s = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    borderRadius: 10,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  imageContainer: {
    height: 100,
    width: 100,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

interface Props {
  onPress: () => void;
  imageUrl?: string;
}

const AddImagePreview = ({ onPress, imageUrl }: Props) => {
  if (imageUrl)
    return (
      <View style={s.imageContainer}>
        <Image source={{ uri: imageUrl }} style={s.image} />
      </View>
    );

  return (
    <TouchableOpacity style={s.container} onPress={onPress}>
      <Icon name="ios-add" size={25} color={theme.colors.primary} />
    </TouchableOpacity>
  );
};

export default AddImagePreview;
