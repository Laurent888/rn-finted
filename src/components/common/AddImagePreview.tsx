import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import theme from "@theme";

const s = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    borderRadius: 10,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
});

const AddImagePreview = ({ onPress }) => {
  return (
    <TouchableHighlight style={s.container} onPress={onPress}>
      <Icon name="ios-add" size={25} color={theme.colors.primary} />
    </TouchableHighlight>
  );
};

export default AddImagePreview;
