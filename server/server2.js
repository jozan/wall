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

// Routes
import createLocation from 'history/lib/createLocation';
import { RoutingContext, match } from 'react-router';
import routes from '../common/routes';

const app = new Express();
const port = 3000;

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));


// This is fired every time the server side receives a request
app.use((req, res) => {
  let location = createLocation(req.url);

  match({ routes, location }, (error, redirectLocation, renderProps) => {

    const slug = location.pathname;

    fetchProjects(slug.substr(1), projects => {
      // Compile an initial state
      const initialState = { projects };

      // Create a new Redux store instance
      const store = configureStore(initialState);

      if (redirectLocation)
        res.redirect(301, redirectLocation.pathname + redirectLocation.search)
      else if (error)
        res.end(500, error.message)
      else if (renderProps == null)
        res.end(404, 'Not found')
      else {
        const html = React.renderToString(
          <Provider store={store}>
            {() => <RoutingContext {...renderProps}/>}
          </Provider>);

        // Grab the initial state from our Redux store
        const finalState = store.getState();

        res.end(renderFullPage(html, finalState));
      }
    });
  });
});

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
