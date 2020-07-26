import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Screens } from "@routeTypes";

import LoginScreen from "@screens/LoginScreen";
import RegisterScreen from "@screens/RegisterScreen";
import LoginHomeScreen from "@screens/LoginHomeScreen";

const Stack = createStackNavigator();

const LoginNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screens.LOGIN_HOME}
        component={LoginHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={Screens.LOGIN} component={LoginScreen} />
      <Stack.Screen name={Screens.REGISTER} component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
