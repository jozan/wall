/* eslint-disable no-console, no-use-before-define */

import path from 'path';
import Express from 'express';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../common/store/configureStore';
import Wall from '../common/containers/Wall';
import { fetchProjects } from '../common/api/api';

const app = new Express();
const port = 3000;

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

// Register URL params
app.param('slug', (req, res, next, slug) => next());

// This is fired every time the server side receives a request
app.use('/:slug?', handleRender);

function handleRender(req, res) {
  // Query our mock API asynchronously
  const { slug } = req.params;

  fetchProjects(slug, projects => {
    // Read the counter from the request, if provided

    // Compile an initial state
    const initialState = { projects };

    // Create a new Redux store instance
    const store = configureStore(initialState);

    // Render the component to a string
    const html = React.renderToString(
      <Provider store={store}>
        { () => <Wall /> }
      </Provider>);

    // Grab the initial state from our Redux store
    const finalState = store.getState();

    // Send the rendered page back to the client
    res.send(renderFullPage(html, finalState));
  });
}

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Projects</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `;
}

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
  }
});
