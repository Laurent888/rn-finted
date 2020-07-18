import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "@screens/ProfileScreen";
import NotLoggedInScreen from "@screens/NotLoggedInScreen";

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Screen name="profile" component={ProfileScreen} />
      ) : (
        <Stack.Screen name="notLoggedIn" component={NotLoggedInScreen} />
      )}
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
