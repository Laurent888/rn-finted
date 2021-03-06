import React from 'react';
import Box from '@components/common/Box';
import ButtonWide from '../common/ButtonWide';

interface Props {
  price: string;
}

const Postage = ({ price }: Props) => {
  return (
    <Box py={[40, 40]}>
      <ButtonWide label="Postage" desc={price} />
    </Box>
  );
};

export default Postage;
