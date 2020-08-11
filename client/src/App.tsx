import React from 'react';

import { ThemeProvider, CSSReset } from '@chakra-ui/core';

import customTheme from './theme';

import Feed from './pages/Feed';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Injecting global styles */}
      <CSSReset />
      <Feed />
    </ThemeProvider>
  );
};

export default App;
