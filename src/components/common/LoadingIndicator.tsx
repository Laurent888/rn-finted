import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { View } from "react-native";
import theme from "@theme";

const LoadingIndicator = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator color={theme.colors.primary} />
    </View>
  );
};

export default LoadingIndicator;
