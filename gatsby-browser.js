/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import "babel-polyfill";
import React from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";

import createStore from "./src/redux/createStore";

export const replaceRouterComponent = ({ history }) => {
  const store = createStore();

  const ConnectedRouterWrapper = ({ children }) => (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );

  return ConnectedRouterWrapper;
};

export const onRouteUpdate = (route) => {
  const location = route.location

  if (location && location.hash) {
    setTimeout(() => {
      const el = document.querySelector(location.hash)
      if (el) {
        const top = el.offsetTop - 40
        window.scrollTo({
          behavior: 'smooth',
          top,
        })
        return true
      }
    }, 0);
  }
};
