import { useForm } from 'react-hook-form';
import React from 'react';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  PseudoBox,
} from '@chakra-ui/core';

import config from '../../config';

const HookForm = () => {
  const { handleSubmit, register, errors } = useForm();

  const validateKeyword = (value: string) => {
    let error;
    if (!value) {
      error = 'Keyword is required';
    }
    return error || true;
  };

  // Search API
  const searchAPI = (keyword: string) => {
    fetch(`${config?.domains?.api}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keyword }),
    });
  };

  // TODO: don't use any type here.
  const onSubmit = (values: any) => {
    const sanitizedKeyword = values.keyword.trim().toLowerCase();
    searchAPI(sanitizedKeyword);

    console.debug('Searching keyword: ', sanitizedKeyword);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.keyword}>
        <FormLabel htmlFor="keyword" display="block" fontSize="sm">
          Search for a keyword
        </FormLabel>
        <Input
          name="keyword"
          placeholder="keyword"
          display="inline-flex"
          ref={register({ validate: validateKeyword })}
          w="2xs"
          fontSize="sm"
          size="sm"
          _focus={{
            outline: 'none',
            bg: 'white',
            boxShadow: 'none',
            borderColor: 'brightblue.500',
          }}
        />
        <PseudoBox
          as="button"
          bg="brightblue.500"
          py="0.33rem"
          px={3}
          ml={4}
          rounded="md"
          fontWeight="semibold"
          fontSize="sm"
          color="white"
          _hover={{ bg: 'brightblue.600' }}
          _focus={{ boxShadow: '0 0 0 3px #6458f526', outline: 'none' }}
        >
          Search
        </PseudoBox>
        <FormErrorMessage>
          {errors.keyword && errors.keyword.message}
        </FormErrorMessage>
      </FormControl>
    </form>
  );
};

export default HookForm;
