import React from 'react';
import { Flex, Spinner } from '@chakra-ui/core';

interface Props {
  paging: boolean;
}

const Progress: React.FC<Props> = (props) => {
  const spin = props.paging ? (
    <Spinner
      thickness="2px"
      speed="0.65s"
      emptyColor="gray.200"
      color="brightblue.500"
      size="md"
    />
  ) : (
    ''
  );
  return (
    <Flex mt={4} align="center" justify="center">
      {spin}
    </Flex>
  );
};

export default Progress;
