import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, DarkMode } from '@chakra-ui/react';

import theme from './theme';
import App from './App';
import Seo from './components/Seo';

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <Seo />
    <DarkMode>
      <App />
    </DarkMode>
  </ChakraProvider>,
  document.getElementById('root')
);
