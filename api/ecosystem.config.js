module.exports = {
  apps : [{
    name: 'twit-api',
    script: './dist/index.js',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    }
  }]
};
