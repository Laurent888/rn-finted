import { AsyncStorage } from "react-native";

export const getTokenFromLS = async () => {
  const token = await AsyncStorage.getItem("token");
  return token;
};
