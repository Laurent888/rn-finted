import React from 'react';
import { Text } from 'react-native';
import Box from './Box';

interface Props {
  error?: any;
}

const Error = ({ error }: Props) => {
  console.log(error);
  return (
    <Box py={[100, 0]} alignItems="center" style={{ flex: 1 }}>
      <Text>ERROR</Text>
    </Box>
  );
};

export default Error;
