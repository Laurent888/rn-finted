import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const n = useNavigation();

  useEffect(() => {
    n.setOptions({
      title: "Register",
    });
  }, []);

  return (
    <View>
      <Text>Register Page</Text>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
