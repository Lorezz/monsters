import { extendTheme } from '@chakra-ui/react';

const t = {
  fonts: {
    body: 'Relaway, system-ui, sans-serif',
    heading: 'Work+Sans, system-ui, sans-serif',
  },
  colors: {
    discord: '#7289da',
    link: '#61dafb',
  },
  shadows: {
    largeSoft: 'rgba(60, 64, 67, 0.15) 0px 2px 10px 6px;',
  },
  styles: {
    global: (props) => ({
      'html, #__next': {
        height: '100%',
      },
      '#__next': {
        display: 'flex',
        flexDirection: 'column',
      },
      '.body': {
        // todo check how to do this without breaking the site
        height: '100%', // Push footer to bottom
        overflowY: 'scroll', // Always show scrollbar to avoid flickering
      },
      html: {
        scrollBehavior: 'smooth',
      },
      'html, body': {
        fontSize: 'sm',
        background: '#2c2f36',
        color: 'white',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
      a: {
        color: 'link',
        textDecoration: 'none',
        fontSize: '14px',
      },
    }),
  },
  // initialColorMode: 'dark',
  // useSystemColorMode: false,
};

const theme = extendTheme(t);
export default theme;
