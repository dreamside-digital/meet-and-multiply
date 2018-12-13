/* eslint-disable no-underscore-dangle */

import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#aac3dc",
      main: "#5a99bf", // blue
      dark: "#2f4858",
    },
    secondary: {
      light: "#ab3911",
      main: "#ab3911", // orange
      dark: "#712206",
    },
    background: {
      default: "#fff",
    }
  },
  typography: {
    fontFamily: `"Helvetica Neue",Helvetica,Arial,sans-serif`,
    fontSize: 18,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    color: '#333',
    display1: {
      fontFamily: `'Averia Serif Libre', cursive`,
      fontSize: 60,
      color: '#DA900A',
      marginTop: "0.75em",
      marginBottom: "0.4em",
      lineHeight: 1.2,
    },
    display2: {
      fontFamily: `'Averia Serif Libre', cursive`,
      fontSize: 48,
      color: '#DA900A',
      marginTop: "0.75em",
      marginBottom: "0.4em",
      lineHeight: 1.2,
    },
    display3: {
      fontFamily: `"Helvetica Neue",Helvetica,Arial,sans-serif`,
      fontSize: 24,
      letterSpacing: "0.05rem",
      color: '#2F4858',
      fontWeight: 700,
      marginTop: "0.75em",
      marginBottom: "0.4em",
      lineHeight: 1.2,
    },
    display4: {
      fontFamily: `"Helvetica Neue",Helvetica,Arial,sans-serif`,
      fontSize: 20,
      letterSpacing: "0.05rem",
      color: '#2F4858',
      fontWeight: 700,
      marginTop: "0.6em",
    },
    title: {
      fontFamily: `'Averia Serif Libre', cursive`,
      fontSize: 72,
      color: '#DA900A',
      fontWeight: 700,
      marginTop: 0,
      marginBottom: 0,
    },
    headline: {
      fontFamily: `'Averia Serif Libre', cursive`,
      letterSpacing: "0.05rem",
      fontSize: 36,
      color: '#AAC3DC',
      fontWeight: 700,
      marginTop: "0.75em",
      marginBottom: "0.4em",
    },
    button: {
      textTransform: "none",
      color: "#fff",
    },
    body1: {
      fontFamily: `"Helvetica Neue",Helvetica,Arial,sans-serif`,
      fontSize: 18,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      color: '#333',
    },
  },
  status: {
    danger: "#FA7921",
  }
});


function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}