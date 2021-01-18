import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core';
import {
  PRIMARY, SECONDARY, SUCCESS, WARNING, ERROR, CONTRAST
} from 'constants/constants';

const theme = createMuiTheme({
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
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
