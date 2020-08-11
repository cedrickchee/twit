/**
 * Global Config
 */

// Domains

/**
 * API Domain
 * Add the domain from your Express.js back-end here.
 * This will enable your front-end to communicate with your back-end.
 * (e.g. 'https://api.mydomain.com' or 'https://twit-api.onrender.com/')
 */
type Domains = {
  api: string | null;
};

type Config = {
  domains: Domains;
};

let config: Config = {
  domains: {
    api: process.env.REACT_APP_API_URL as string
  }
};

// Check if API URL has been set
if (!config?.domains?.api) {
  throw new Error(
    `Error: Missing API Domain – Please add the API domain from your Express.js back-end to this front-end application. You can do this in the "./config.js" file. Instructions are listed there and in the documentation.`
  );
}

export default config;
