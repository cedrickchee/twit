import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import { Box } from '@chakra-ui/core';

import { FeedState, Tweet } from '../types';
import TweetStack from '../components/TweetStack';
import Progress from '../components/Progress';
import NotificationBar from '../components/NotificationBar/NotificationBar';
import Search from '../components/Search/Search';
import config from '../config';

const Feed: React.FC = () => {
  /**
   * Application state
   */
  const [feed, setFeed] = useState<FeedState>({
    tweets: [],
    count: 0,
    page: 0,
    paging: false,
    skip: 0,
    done: false,
    searchTerm: 'JavaScript',
  });

  const [queue, setQueue] = useState<FeedState>({
    tweets: [],
    count: 0,
    page: 0,
    paging: false,
    skip: 0,
    done: false,
    searchTerm: 'JavaScript',
  });

  const getInitialState = async () => {
    let data: Tweet[];

    // Get latest ten Tweets order by status date
    try {
      const res = await fetch(`${config?.domains?.api}/page/0/0`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      data = await res.json();

      // delete properties from object: _id, createdAt
      const newData: Partial<Tweet>[] = data.map(
        ({ _id, createdAt, ...item }) => item,
      );

      setFeed({ ...feed, tweets: newData });
    } catch (error) {
      console.log('fetch error: ', error);
    }
  };

  useEffect(() => {
    // Get initial state
    getInitialState();
  }, []);

  /**
   * Methods
   */

  // Add a tweet to timeline
  const addTweet = (tweet: Partial<Tweet>) => {
    let updated = feed.tweets;

    // Increment the unread and skip count
    const count = feed.count + 1;
    const skip = feed.skip + 1;

    // Add tweet to the end of the tweets array
    updated.push(tweet);

    setFeed({ ...feed, tweets: updated, count, skip });
  };

  // Add a tweet to queue (state)
  const addQueue = (tweet: Partial<Tweet>) => {
    // Get current queue state
    let updated = queue.tweets;

    // Increment the unread and skip count
    const count = queue.count + 1;
    const skip = queue.skip + 1;

    // Add tweet to the beginning of the tweets array
    updated.unshift(tweet);

    // Set queue state
    setQueue((prevQueue) => {
      const tweets = prevQueue.tweets;
      tweets.unshift(tweet);
      return { ...prevQueue, tweets, count, skip };
    });
  };

  // Check if more tweets should be loaded, by scroll position
  const checkWindowScroll = async () => {
    // Get scroll position and window data
    const h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0,
    );
    const s =
      document.body.scrollTop || document.documentElement.scrollTop || 0;
    const extraHeightOffset = 100;
    const scrolled = h + s >= document.body.offsetHeight + extraHeightOffset;

    // If scrolled enough, not currently paging and not complete
    if (scrolled && !feed.paging && !feed.done) {
      const page = feed.page + 1;
      setFeed({ ...feed, paging: true, page });

      setTimeout(() => {
        loadUnreadTweets();
      }, 1000);
    }
  };

  // Show the unread tweets
  const loadUnreadTweets = () => {
    let updated = feed.tweets;

    // Mark our tweets active
    updated.forEach((tweet) => {
      tweet.active = true;
    });

    // Update application state and reset Tweet unread count
    setFeed({ ...feed, tweets: updated, count: 0 });
    // Reset queue state
    setQueue({ ...queue, tweets: [], count: 0, skip: 0 });
  };

  /**
   * React Hooks and Effects
   */
  useEffect(() => {
    const pusherClient = new Pusher('7b5fa8ee509bf8bace8a', {
      cluster: 'mt1',
    });
    const channel = pusherClient.subscribe('twit');
    channel.bind('tweets', (data: Partial<Tweet>) => {
      // Add a tweet to our queue
      addQueue(data);
    });

    // Clean up the effect
    return () => {
      channel.unbind();
      pusherClient.unsubscribe(channel.name);
    };
  }, []);

  useEffect(() => {
    const latestTweet = queue.tweets[0];
    if (latestTweet) {
      addTweet(latestTweet);
    }
  }, [queue]);

  useEffect(() => {
    // Attach scroll event to the window for infinite scroll and pagination
    window.addEventListener('scroll', checkWindowScroll);

    return () => window.removeEventListener('scroll', checkWindowScroll);
  }, [feed]);

  /**
   * Render component
   */
  return (
    <>
      <NotificationBar count={feed.count} />
      <Box
        width={[
          '90%', // base
          '75%', // 480px upwards
          '65%', // 768px upwards
          '50%', // 992px upwards
        ]}
        mt="1rem"
        mb="12rem"
        mx="auto"
      >
        <Search />
        <TweetStack {...feed} />
        <Progress paging={feed.paging} />
      </Box>
    </>
  );
};

export default Feed;
