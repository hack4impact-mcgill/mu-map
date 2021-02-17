import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { createMuiTheme, CssBaseline, responsiveFontSizes } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core';
import AvantGarde from './fonts/AvantGardeLT-Book.woff';
import AvantGarde2 from './fonts/AvantGardeLT-Book.woff2';
import {
  PRIMARY,
  SECONDARY,
  SUCCESS,
  WARNING,
  ERROR,
  CONTRAST
} from 'constants/constants';

const avantGarde = {
  fontFamily: 'AvantGarde LT',
  fontStyle: 'normal',
  fontDisplay: 'swap' as 'swap',
  fontWeight: 500,
  src: `
    local('AvantGarde LT'),
    url(${AvantGarde}) format('woff'),
    url(${AvantGarde2}) format('woff2')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

let theme = createMuiTheme({
  palette: {
    primary: {
      main: PRIMARY,
      contrastText: CONTRAST
    },
    secondary: {
      main: SECONDARY,
      contrastText: CONTRAST
    },
    success: {
      main: SUCCESS,
      contrastText: CONTRAST
    },
    warning: {
      main: WARNING,
      contrastText: CONTRAST
    },
    error: {
      main: ERROR,
      contrastText: CONTRAST
    }
  },
  typography: {
    fontFamily: 'AvantGarde LT',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [avantGarde],
      },
    },
  },
});

theme = responsiveFontSizes(theme);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// Change unregister() to register() when the app is ready for distribution
serviceWorkerRegistration.unregister();

// See https://bit.ly/CRA-vitals for analytics instructions
reportWebVitals();
