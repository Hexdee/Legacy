import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '1024px',
  xl: '1200px',
  xxl: '1441px',
});

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

const theme = extendTheme({ colors, styles, fonts, breakpoints });

export default theme;