import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { ApolloProvider } from "@apollo/client";

import { client } from "./src/lib/apollo";
import theme from "./src/style/theme";

import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <ApolloProvider client={client}>
        <StatusBar style="auto" />
        <AppNavigator />
      </ApolloProvider>
    </PaperProvider>
  );
}
