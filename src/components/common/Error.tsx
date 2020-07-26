import React from "react";
import { View, Text } from "react-native";

interface Props {
  error: any;
}

const Error = ({ error }: Props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", paddingTop: 100 }}>
      <Text>{error.message}</Text>
    </View>
  );
};

export default Error;
