# Questions

1. What external libraries did you use? What are they used for?

- [TypeScript](https://www.typescriptlang.org/): a language which builds on JavaScript. It saves you time catching errors and providing fixes before you run code.
- [Express.js](https://expressjs.com/): a minimal and flexible Node.js web app framework.
- [React Hooks](https://reactjs.org/docs/hooks-intro.html): Hooks solve a wide variety of seemingly unconnected problems in React:
  - It's hard to reuse stateful logic between components.
  - JavaScript classes confuse people.
  - Complex components become hard to understand.
- [Chakra UI](https://chakra-ui.com/): a simple, modular, and accessible component library. Less bloated than [Material-UI](https://material-ui.com/). Chakra UI is established on principles that keep its components fairly consistent. It uses [Styled System](https://styled-system.com/) to achieve this. When I need to get started with a project that has a very short deadline (especially something a few users would be using or only yourself), then Tailwind CSS is not the best option. In those cases, I'd recommend Chakra UI or Material UI.
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) provides an easy way to host and manage your NoSQL database in the Cloud (kind of serverless). In our case, NoSQL DB has a better fit than SQL DB because we don't need the safety benefits of SQL DB when we are just storing Twitter stream data for a short periof of time (transient).
- [Mongoose](https://mongoosejs.com/): an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
- [Pusher Channels](https://pusher.com/channels) provides realtime communication between servers and apps using [WebSocket](https://en.wikipedia.org/wiki/WebSocket). Initially, I used [socket.io](https://socket.io/) for WebSocket implementation. I realized that, it will be challenging to scale up WebSocket for larger scale production deployment to Cloud providers as some of their services doesn't support WebSocket or have limitations. For example, AWS Lambda and API Gateway only fairly recently added WebSocket support.
- [Twitter for Node.js](https://github.com/desmondmorris/node-twitter): a robust client library for the Twitter Streaming API's.

2. What are the difficulties you faced while working on this project? How did you manage to get around them? Feel free to link StackOverflow posts - we're all constantly learning.

- Twitter stream:
  - Error handling of Twitter streaming API connection, disconnection, and reconnection.
  - Frequently hit HTTP 420 or 429 (Too Many Requests) when the Node.js client is being rate limited by Twitter API.
    - Partially solve by managing stream with exponential backoff strategy/backfill.
    - Most of the problems were taken care off by properly managing client (React app) WebSocket connections accessing the stream. On React component unmount, the client should clean up open connections, closing them to prevent running out of connections.
  - Track and untrack a list of keywords
    - Solve: watch yourself when updating your tracking keywords. Twitter has [guidelines](https://developer.twitter.com/en/docs/basics/rate-limiting) for connection rate limiting.
- Realtime challenges:
  - Duplicate Tweets and Tweets displayed out-of-order. When we have an app that not only renders client side, but has an active stream saving to the database behind the scenes, we need to create a way to make sure that when we request our next page of Tweets, it takes into account that Tweets may have been added since the app has been running on the client.
    - Solve by implementing a queue for new and unread Tweets.
- Frontend challenges:
  - The high volume of Tweets emitted by WebSocket server will slow down the app.
    - Partially solve: implement a queueing system for new Tweets.
  - Infinite scrolling cause layout shifts.
    - Solution (not implemented yet): good UX should show layout skeleton as the new Tweets are loading.
  - UI framework
    - Chakra UI documentation is good but lacking examples/recipes and advanced usage like creating custom components, advanced CSS styling.
      - Partially solve: workaround by using [CSS Modules](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/).
