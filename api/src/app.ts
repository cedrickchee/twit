import express from 'express';

import pusher from './config/pusher';

/**
 * Setup database connection
 */

// Configure Mongoose database connection
// import * as db from './config/db';
require('./config/db');

/**
 * Routers and controllers
 */
import tweetRouter from './routes/tweet';
import indexRouter from './routes/index';

/**
 * Configure web server
 */
const app = express();

/**
 * Configure Express.js Middleware
 */

// Enable CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('x-powered-by', 'twit');
  next();
});

// enable JSON use. Parse JSON bodies
app.use(express.json());
// parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

/**
 * Routes - Public
 */
app.use(tweetRouter(pusher));
app.use(indexRouter);

/**
 * Routes - Catch-All
 */
app.get(`/*`, (req, res) => {
  res.status(404).send({ message: 'Route not found' });
});

/**
 * Error Handler
 */
app.use(function (err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).send('Internal server error');
});

export default app;
