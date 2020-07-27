import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import Modal from "react-native-modal";
import theme from "@theme";

import Button from "../../components/common/Button";

interface Props {
  isVisible: boolean;
  onPress: (imgUrl: string) => void;
}

const AddImageModal = ({ isVisible, onPress }: Props) => {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <Modal
      isVisible={isVisible}
      style={{
        width: theme.dimensions.width,
        alignSelf: "center",
      }}
      backdropColor="#fff"
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          paddingHorizontal: 20,
          paddingVertical: 30,
        }}
      >
        <Text style={{ color: theme.colors.mediumGrey, marginBottom: 10 }}>
          Copy an image url here (eg: unsplash.com, pexel.com)
        </Text>
        <TextInput
          mode="flat"
          label="Image url"
          style={{ backgroundColor: "#fff" }}
          onChangeText={(text: string) => setImageUrl(text)}
        />
        <View style={{ paddingVertical: 30 }}>
          <Button onPress={() => onPress(imageUrl)}>Save</Button>
        </View>
      </View>
    </Modal>
  );
};

export default AddImageModal;

const styles = StyleSheet.create({});
