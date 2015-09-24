import 'babel-core/polyfill';

import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import createBrowserHistory from 'history/lib/createBrowserHistory';
import configureStore from '../common/store/configureStore';
import routes from '../common/routes';

const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState);
const history = createBrowserHistory();

const rootElement = document.getElementById('app');

React.render(
  <Provider store={store}>
    {() =>
      <Router children={routes} history={history} />
    }
  </Provider>,
  rootElement
);
