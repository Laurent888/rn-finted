import React from "react";
import { StyleSheet, Text, View } from "react-native";
import theme from "@theme";

const ItemDescription = () => {
  return (
    <View style={s.container}>
      <Text style={s.title}>Item description</Text>
      <Text style={s.desc}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat fugit
        magni consequatur hic veniam, laboriosam cumque iure corporis,
        perferendis sint exercitationem! Eum esse deleniti animi maxime ullam,
        soluta dolore dicta?
      </Text>
    </View>
  );
};

export default ItemDescription;

const s = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: theme.colors.white,
    padding: theme.padding.large,
  },
  title: {
    fontSize: theme.fontSize.normal,
    color: theme.colors.mediumGrey,
  },
  desc: {
    fontSize: theme.fontSize.normal,
    paddingVertical: theme.padding.large,
    color: theme.colors.darkGrey,
  },
});
