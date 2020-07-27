import { AsyncStorage } from "react-native";

export const logout = async () => {
  await AsyncStorage.removeItem("TOKEN");
};
