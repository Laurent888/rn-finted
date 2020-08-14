import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import Modal from 'react-native-modal';
import { Entypo } from '@expo/vector-icons';
import theme from '@theme';

import Button from '../../components/common/Button';
import { mockPhoto } from '@constants/mockData';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onPress: (imgUrl: string) => void;
}

const AddImageModal = ({ isVisible, onPress, onClose }: Props) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    setImageUrl(mockPhoto[Math.floor(Math.random() * mockPhoto.length)].name);
  }, [isVisible]);

  return (
    <Modal
      isVisible={isVisible}
      style={{
        width: theme.dimensions.width,
        alignSelf: 'center',
      }}
      backdropColor="#fff"
    >
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          paddingHorizontal: 20,
          paddingVertical: 30,
        }}
      >
        <TouchableOpacity style={{ marginBottom: 30 }} onPress={onClose}>
          <Entypo name="cross" size={30} color="#444" />
        </TouchableOpacity>
        <Text style={{ color: theme.colors.mediumGrey, marginBottom: 10 }}>
          Copy an image url here (eg: unsplash.com, pexel.com)
        </Text>
        <TextInput
          mode="flat"
          label="Image url"
          style={{ backgroundColor: '#fff' }}
          onChangeText={(text: string) => setImageUrl(text)}
        />
        <View style={{ paddingVertical: 30 }}>
          <Button
            onPress={() => {
              onPress(imageUrl);
            }}
          >
            Save
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default AddImageModal;

const styles = StyleSheet.create({});
