// Tweet model based on defined schema

import { Document, Schema, Model, model } from 'mongoose';

export interface ITweetDocument extends Document {
  id: string;
  active: boolean;
  author: string;
  avatar: string;
  text: string;
  date: Date;
  screenName: string;
}

export interface ITweetModel extends Model<ITweetDocument> {
  findTweets(
    page: number,
    skip: number,
    callback: (tweets: ITweetDocument[]) => void,
  ): void;
}

// Define schema for tweet data
const tweetSchema: Schema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
    },
    author: {
      type: String,
    },
    avatar: {
      type: String,
    },
    text: {
      type: String,
    },
    date: {
      type: Date,
    },
    screenName: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Create a static findTweets method to return tweet data from the DB
tweetSchema.statics.findTweets = (
  page: number,
  skip: number,
  callback: (tweets: ITweetDocument[]) => void,
) => {
  let tweets: ITweetDocument[] = [];
  const start = page * 10 + skip * 1;

  // Query the DB, using skip and limit to achieve page chunks
  Tweet.find({}, 'id active author avatar text date screenName createdAt', {
    skip: start,
    limit: 10,
  })
    .sort({ date: 'desc' })
    .exec((err, docs) => {
      if (!err) {
        tweets = docs; // we have tweets
        tweets.forEach((tweet) => {
          tweet.active = true; // set them to active
        });
      }

      // Pass them back to the specified callback
      callback(tweets);
    });
};

const Tweet = model<ITweetDocument, ITweetModel>('Tweet', tweetSchema);

export default Tweet;
