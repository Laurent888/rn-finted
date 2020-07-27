import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button as ButtonPaper } from "react-native-paper";
import theme from "@theme";

interface Props {
  children: React.ReactNode;
  style?: any;
  mode?: "text" | "outlined" | "contained" | undefined;
  onPress?: () => void;
  disabled?: boolean;
}

const Button = ({
  children,
  mode,
  style,
  onPress,
  disabled,
  ...rest
}: Props) => {
  return (
    <ButtonPaper
      {...rest}
      mode={mode}
      style={style}
      labelStyle={{
        color: mode === "contained" ? "#fff" : theme.colors.primary,
      }}
      onPress={onPress}
      disabled={disabled}
    >
      {children}
    </ButtonPaper>
  );
};

export default Button;

const s = StyleSheet.create({});
