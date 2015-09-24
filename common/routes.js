import React from 'react';
import { Route } from 'react-router';

import Wall from '../common/containers/Wall';
import Project from '../common/containers/ProjectPage';

const routes = (
  <Route path="/" component={Wall}>
    <Route path="/card"
           component={Project} />
  </Route>
);

export default routes;
