import path from 'path';

import * as dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../.env.dev') });

import app from './app';

const PORT = process.env.PORT || 8020;

app.listen(PORT, () => {
  console.log('Express server running on port %d', PORT);
});
