import { extendTheme } from '@chakra-ui/react';

const colors = {
    brand: {
      primary: '#7000FF',
      white: '#FFFFFF',
      yellow: '#F7E427',
      dark: '#040211',
    },
  }

  const fonts = {
    heading: `'Coda', Raleway`,
    body: `'Coda', Raleway`,
  }

  const styles = {
      body: {
        fontFamily: "'Coda', cursive",
      },
      '::placeholder': {
        color: '#BABABA',
      },
  };

const theme = extendTheme({ colors, styles, fonts });

export default theme;