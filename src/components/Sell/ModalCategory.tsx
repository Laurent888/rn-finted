import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

import theme from "@theme";
import { categories } from "../../constant/categories";

import ButtonWide from "../../components/common/ButtonWide";

interface Props {
  isVisible: boolean;
  cancel: () => void;
}

const ModalCategory = ({ isVisible, cancel }: Props) => {
  const renderCategories = () =>
    Object.keys(categories).map((c) => (
      <ButtonWide key={c} label={c} onPress={() => console.log("")} />
    ));
  return (
    <Modal
      coverScreen
      style={{
        alignSelf: "center",
        justifyContent: "flex-start",
        width: theme.dimensions.width,
      }}
      backdropColor="#fff"
      backdropOpacity={1}
      isVisible={isVisible}
    >
      <View style={s.cancel}>
        <TouchableOpacity onPress={cancel}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
      {renderCategories()}
    </Modal>
  );
};

export default ModalCategory;

const s = StyleSheet.create({
  cancel: {
    paddingHorizontal: theme.padding.large,
    paddingVertical: theme.padding.medium,
  },
});
