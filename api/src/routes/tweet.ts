import express, { Router } from 'express';
import Twitter from 'twitter';
import Pusher from 'pusher';

import processStream from '../utils/process_stream';
import Tweet from '../models/Tweet';

const router = express.Router();

const tweetRouter = (pusher: Pusher): Router => {
  let dataStream;
  const twitter = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY as string,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY as string,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string,
  });

  /**
   * Defaults
   */
  let searchKeyword = 'JavaScript';
  const showRT = false;

  /**
   * Listen to Twitter stream.
   */
  const streamTweets = () => {
    // eslint-disable-next-line no-console
    console.log('Streaming Tweets for ' + searchKeyword);

    // Set a stream listener for tweets matching tracking keywords
    const stream = twitter.stream('statuses/filter', { track: searchKeyword });
    processStream(stream, pusher, showRT);

    return stream;
  };

  if (dataStream) {
    dataStream.destroy();
  }
  dataStream = streamTweets();

  /**
   * Routes
   */

  // Sets search term for Twitter stream.
  router.post('/search', (req, res) => {
    const keyword = req.body.keyword;
    searchKeyword = keyword;

    // eslint-disable-next-line no-console
    console.log('Search keyword:', keyword);

    if (dataStream) {
      dataStream.destroy();
      // eslint-disable-next-line no-console
      console.log('Data stream destroyed');
    }
    setTimeout(() => {
      dataStream = streamTweets();
      // eslint-disable-next-line no-console
      console.log('Stream tweets');
    }, 2000);
  });

  // Paginate tweets
  router.get('/page/:page/:skip', (req, res) => {
    // Return tweets from model by page number and offset.
    Tweet.schema.statics.findTweets(
      req.params.page,
      req.params.skip,
      (tweets) => {
        // Render as JSON
        res.status(200).json(tweets);
      },
    );
  });

  return router;
};

export default tweetRouter;
