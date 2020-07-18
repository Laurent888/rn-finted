import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";

import theme from "./src/style/theme";

import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="auto" />
      <AppNavigator />
    </PaperProvider>
  );
}
