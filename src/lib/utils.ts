import { AsyncStorage } from "react-native";
import { isLoggedInVar } from "./apollo";

export const logout = async () => {
  await AsyncStorage.removeItem("TOKEN");
  isLoggedInVar(false);
};
