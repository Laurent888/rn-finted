import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { Screens } from "@routeTypes";

const NotLoggedInScreen = ({ navigation }) => {
  const openLoginScreen = () => {
    navigation.navigate("loginModal");
  };

  return (
    <View>
      <Text>You are not logged in !</Text>
      <Button mode="outlined" onPress={openLoginScreen}>
        Login
      </Button>
    </View>
  );
};

export default NotLoggedInScreen;

const styles = StyleSheet.create({});
