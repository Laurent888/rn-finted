import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import Modal from 'react-native-modal';
import { Entypo } from '@expo/vector-icons';
import theme from '@theme';

import Button from '../../components/common/Button';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onPress: (imgUrl: string) => void;
}

const mockPhoto = [
  {
    name:
      'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  },
  {
    name:
      'https://images.unsplash.com/photo-1517439270744-8d9287c2f8f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  },
  {
    name:
      'https://images.unsplash.com/photo-1551721434-8b94ddff0e6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  },
  {
    name:
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  },
  {
    name:
      'https://images.unsplash.com/photo-1505158498176-0150297fbd7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  },
];

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
