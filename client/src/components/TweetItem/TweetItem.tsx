import React from 'react';
import { Box, Text, Heading, Avatar, Link } from '@chakra-ui/core';

import { Tweet } from '../../types';

import styles from './TweetItem.module.css';

interface Props {
  tweet: Partial<Tweet>;
}

const TweetItem: React.FC<Props> = (props) => {
  const { tweet } = props;

  return (
    <Box
      p={5}
      display={{ xs: 'flex' }}
      borderBottom="0.15rem dashed #718096"
      className={tweet.active ? '' : styles.inactive}
      {...props}
    >
      <Box flexShrink={0}>
        <Link href={`https://twitter.com/${tweet.screenName}`} isExternal>
          <Avatar size="md" name={tweet.author} src={tweet.avatar} />
        </Link>
      </Box>
      <Box
        mt={{ base: 4, xs: 0 }}
        ml={{ xs: 4 }}
      >
        <Heading fontSize="xl">
          <Link href={`https://twitter.com/${tweet.screenName}`} isExternal>
            {tweet.author}
          </Link>
        </Heading>
        <Link
          color="gray.500"
          display="block"
          fontSize="sm"
          fontWeight="bold"
          letterSpacing="wide"
          href={`https://twitter.com/${tweet.screenName}`}
          isExternal
        >
          @{tweet.screenName}
        </Link>
        <Link
          href={`https://twitter.com/${tweet.screenName}/status/${tweet.id}`}
          isExternal
          _hover={{ textDecoration: 'none' }}
        >
          <Text mt={1} fontSize="sm">
            {tweet.text}
          </Text>
        </Link>
      </Box>
    </Box>
  );
};

export default TweetItem;
