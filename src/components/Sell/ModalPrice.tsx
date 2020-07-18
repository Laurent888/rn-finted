import React, { ChangeEvent, useState } from "react";
import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
import Modal from "react-native-modal";

import Button from "../common/Button";

interface Props {
  s: any;
  values: any;
  onPress: (v: string) => void;
  isVisible: boolean;
}

const { width, height } = Dimensions.get("window");

const ModalPrice = ({ s, onPress, isVisible }: Props) => {
  const [price, setPrice] = useState<string>("");

  return (
    <Modal
      isVisible={isVisible}
      coverScreen={true}
      style={{
        backgroundColor: "#fff",
        width,
        height: height + 50,
        alignSelf: "center",
        justifyContent: "flex-start",
      }}
      backdropOpacity={1}
      backdropColor="#fff"
    >
      <View style={[s.inputContainer, { borderBottomWidth: 0 }]}>
        <Text style={s.label}>Price</Text>
        <TextInput
          label="Price"
          onChangeText={(e) => setPrice(e)}
          value={price}
          style={s.inputText}
          keyboardType="decimal-pad"
        />
      </View>
      <Button onPress={() => onPress(price)}>Save</Button>
    </Modal>
  );
};

export default ModalPrice;

const s = StyleSheet.create({});
