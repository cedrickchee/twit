import React from 'react';
import { Flex, Text } from '@chakra-ui/core';

import styles from './NotificationBar.module.css';

interface Props {
  count: number;
}

const NotificationBar: React.FC<Props> = (props) => {
  const { count } = props;

  return (
    <Flex
      position="fixed"
      top={-60}
      w="100%"
      h="2rem"
      align="center"
      justify="center"
      bg="brightblue.500"
      zIndex={1}
      className={count > 0 ? styles.active : ''}
    >
      <Text fontSize="sm" fontWeight="bold" color="white">
        {count} new Tweets.
      </Text>
    </Flex>
  );
};

export default NotificationBar;
