import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { View, Image } from 'react-native';
import theme from '@theme';
import { SharedElement } from 'react-navigation-shared-element';

interface LoadingProps {
  sharedImageId?: string;
  imageUrl?: string;
}

const LoadingIndicator = ({ sharedImageId, imageUrl }: LoadingProps) => {
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      {sharedImageId && (
        <View style={{ width: '100%', height: 400 }}>
          <SharedElement id={sharedImageId}>
            <Image source={{ uri: imageUrl }} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
          </SharedElement>
        </View>
      )}
      <View style={{ position: 'absolute', bottom: '10%', left: '47%' }}>
        <ActivityIndicator color={theme.colors.primary} />
      </View>
    </View>
  );
};

export default LoadingIndicator;
