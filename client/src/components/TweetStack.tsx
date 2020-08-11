import React from 'react';
import { Stack } from '@chakra-ui/core';

import { FeedProps, Tweet } from '../types';
import TweetItem from './TweetItem/TweetItem';

const TweetStack: React.FC<FeedProps> = (props) => {
  // Build stack of single tweet components using map
  const tweetItems = props.tweets.map((tweet: Partial<Tweet>, index) => {

    return <TweetItem key={index} tweet={tweet} />;
  });

  return <Stack spacing={0}>{tweetItems}</Stack>;
};

export default TweetStack;
