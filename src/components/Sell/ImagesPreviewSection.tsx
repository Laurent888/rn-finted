import React from 'react';
import { View } from 'react-native';
import AddImagePreview from '../common/AddImagePreview';

interface Props {
  maxImages: number;
  images: string[];
  onPress: () => void;
}

const ImagesPreviewSection = ({ maxImages, images, onPress }: Props) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {/* {<AddImagePreview onPress={onPress} />} */}
      {images.map((i, idx) => {
        return <AddImagePreview key={idx} onPress={onPress} imageUrl={i} />;
      })}
      {images.length < maxImages && <AddImagePreview onPress={onPress} />}
    </View>
  );
};

export default ImagesPreviewSection;
