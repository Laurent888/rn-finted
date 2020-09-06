import { StatusBar } from 'expo-status-bar';
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
import React, { useState, useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { ApolloProvider, ApolloClient } from '@apollo/client';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { makeApolloClient } from './src/lib/apollo';
import theme from './src/style/theme';

import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [client, setClient] = useState<ApolloClient<any>>();

  const initializeApolloClient = () => {
    const apolloClient = makeApolloClient();

    setClient(apolloClient);
  };

  useEffect(() => {
    initializeApolloClient();
  }, []);

  const loadAssetAsync = async () => {
    await Asset.loadAsync([]);
  };

  const handleComplete = () => {
    setIsAppLoaded(true);
  };

  if (!isAppLoaded || !client)
    return <AppLoading startAsync={loadAssetAsync} onFinish={handleComplete} onError={console.warn} />;

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <ApolloProvider client={client}>
          <StatusBar style="auto" />
          <AppNavigator />
        </ApolloProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
