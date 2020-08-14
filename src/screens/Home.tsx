import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';

export default function Home() {
  const [value, setValue] = useState('');
  const t = useTheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          paddingHorizontal: 20,
          marginBottom: 10,
        }}
      >
        <TextInput
          mode="flat"
          style={{ width: '100%' }}
          label="email"
          value={value}
          onChangeText={(e) => setValue(e)}
        />
      </View>

      <Button mode="contained" onPress={() => console.log(value)}>
        Click here
      </Button>
      <View
        style={{
          width: 100,
          height: 100,
          marginVertical: 20,
          backgroundColor: t.colors.lightGrey,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
