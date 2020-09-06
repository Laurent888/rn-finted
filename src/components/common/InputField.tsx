import React, { ChangeEvent } from 'react';
import { Text, View, NativeSyntheticEvent, TextInputFocusEventData, TextInputProps } from 'react-native';

import { TextInput } from 'react-native-paper';
import { useField } from 'formik';
import theme from '@theme';

interface Props extends TextInputProps {
  name: string;
  label: string;
  value: string;
  onChangeText: (e: string | ChangeEvent<any>) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  style?: any;
  containerStyle?: any;
}

const InputField = ({ label, value, onChangeText, onBlur, style, containerStyle, ...props }: Props) => {
  const [field, meta] = useField(props);

  return (
    <View style={containerStyle}>
      <TextInput
        label={label}
        mode="outlined"
        value={value}
        onBlur={onBlur}
        onChangeText={onChangeText}
        style={[
          style,
          {
            height: props.multiline ? 120 : 50,
          },
        ]}
        {...props}
      />
      {meta.touched && meta.error ? (
        <View>
          <Text style={{ marginLeft: 5, color: theme.colors.error }}>{meta.error}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default InputField;
