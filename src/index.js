import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, DarkMode } from '@chakra-ui/react';

import theme from './theme';
// import './index.css';
import App from './App';

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <DarkMode>
      <App />
    </DarkMode>
  </ChakraProvider>,
  document.getElementById('root')
);
