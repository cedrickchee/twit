# Twit

Twit is a simple Twitter client, built using React.js, Node.js, and friends.

Twit fetches a realtime list of Tweets for a given keyword. New unread Tweets
appear as a notification bar that will prompt the user to view them, in an
infinite scroll style.

**Demo**

Twitter client: https://d2ccty7fz88oi0.cloudfront.net/

API endpoint: https://twit-api.onrender.com/

## Design and Tech Stack

- Runtime: Node.js 12+ (tested v12.18.3 on linux)
- Language: TypeScript
- Web framework: Express.js
- Front-end library: React.js
- State and lifecycle in React component: [Hooks](https://reactjs.org/docs/hooks-intro.html)
- Simple, modular, and accessible component library: [Chakra UI](https://chakra-ui.com/)
- Database: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) provides an easy way to host and manage your data in the Cloud.
- Websocket: [Pusher Channels](https://pusher.com/channels) provides realtime communication between servers and apps.

## Features

- _Relatively_ easy to understand project structure.
- Written in modern React, only functional components with hooks.
- Simple local React state management, without Redux or similar.
- Client written in TypeScript.
- API written in TypeScript and using Mongoose ODM.
- Prettier to format code.
- ESLint helps present code that's more clean and consistent.

---

## Setup

### Prerequisite

For a hitch-free flow of procedures in this project, we will begin by setting up
the required credentials with MongoDB Atlas and Pusher.

**MongoDB Atlas**

[Follow this guide](https://docs.atlas.mongodb.com/getting-started/) to create
an Atlas cluster and connecting to it.

After you have created Atlas cluster, copy the connection string and add them
directly to an `.env.dev` file. Create an empty `.env.dev` file in [`/api`](./api), copy `/api/.env.dev.example`
contents into it, and fill in your MongoDB Atlas connection string.

**Pusher**

If you don't have an account, kindly create one. Once you are done, go ahead and
create a new app from your dashboard. Don't forget to take note of your
`app_id`, `key`, `secret` and `cluster` as you will be required to use them
later.

Docs: [Get your Pusher API keys](https://pusher.com/docs/channels/getting_started/javascript#get-your-free-api-keys)

After you have created Pusher account, copy the credentials and add them to
an `.env.dev` file, within the root of the [`/api`](./api) project.

**Twitter APIs**

You will need valid Twitter Developer credentials in the form of a set of
consumer and access tokens/keys. You can get these [here](https://developer.twitter.com/en/apply-for-access).

Copy the credentials and add them to the same `.env.dev` file.

### Setup Development Environment

Instructions for setting up project in local development environment.

#### API (Backend)

Setup and run the web server.

1. `cd` into 'api' directory:

```sh
$ cd api
```

2. Install NPM packages:

```sh
$ npm i
```

3. Once all the necessary files are installed, start the web server with:

```sh
$ npm start
```

#### Client (Frontend)

Setup the frontend of the web app.

1. `cd` into 'client' directory:

```sh
$ cd client
```

2. Install NPM packages:

```sh
$ npm i
```

3. Start the application with:

```sh
$ npm start
```

By now, React app should now be running on http://localhost:3000/ and you should
have a new tab opened in your default browser.

Alternatively, to get up and running quickly, I've provided a Makefile:

```sh
$ make
install-dependencies           Install all project dependencies
build                          Build both api and client project
run-api                        Run API server
run-client                     Run React application

$ make install-dependencies

$ make run-api

$ make run-client
```

We have successfully setup both the backend and frontend of the application.

## Deployment

Now, you are ready to deploy. You can deploy our project to AWS, [Render](https://render.com/),
or Heroku.

I have deployed the demo:
- API backend to Render. ([Docs](https://render.com/docs/deploy-node-express-app))
- Client app to AWS S3 and Cloudfront.

## Assumptions

- Initial page load should show 10 latest Tweets.
- Don't show re-Tweets
- Inform user of new Tweets after initial page load.

## Future Improvements

What's missing and what could have been done better?

- Infinite scroll (performance optimizations)
  + Should not load all unread Tweets at once
  + Efficiently rendering large lists and data
    + Should destroy list items that are out of viewport, else scrolling will lag as the list grow over time when populated with latest Tweets.
    + Can explore using [react-virtualized](https://github.com/bvaughn/react-virtualized) components to solve this problem.
- Animations
  + Ease-in transition animation for new Tweets.
- Backend API
  + Storing stream of Tweets in database will required substantial disk space as the number of records are increasing quickly. So, need to clear out old Tweets from database using background scheduled/cron jobs.
- Unit/integration tests
  + Both client and API are currently not tested through Jest, React Testing Library, and end-to-end Cypress tests.
- Deployment guide
- Integrate build process with CI/CD tools like CircleCI.

## Questions

[Write-up](./follow-up-questions.md).
