import Tweet from '../models/Tweet';

const twitStream = (stream, pusher, showRT) => {
  // Socket.io emits the Tweet data from stream.
  const emitTweet = (message) => {
    pusher.trigger('twit', 'tweets', message);
  };

  // Event handlers
  stream.on('data', function (data) {
    if (data.user !== undefined) {
      // Filter out retweet
      if (!showRT && data.text.includes('RT')) {
        return;
      }

      // Tweet object
      const tweet = {
        id: data['id_str'],
        active: false,
        author: data.user.name,
        avatar: data.user['profile_image_url'],
        text: data.text,
        date: data['created_at'],
        screenName: data.user['screen_name'],
      };

      // Create a new model instance with our Tweet object
      const tweetDoc = new Tweet(tweet);

      // Save to the database
      tweetDoc.save((err) => {
        if (!err) {
          emitTweet(tweet);
        }
      });
    }
  });

  stream.on('error', (error) => {
    // eslint-disable-next-line no-console
    console.error('Stream error: ', error);
    // throw error;
  });
};

export default twitStream;
