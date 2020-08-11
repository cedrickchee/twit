import React from 'react';
import { Flex } from '@chakra-ui/core';

import HookForm from './HookForm';

const Search = () => {
  return (
    <Flex mb={8} align="center" justify="center">
      <HookForm />
    </Flex>
  );
};

export default Search;
