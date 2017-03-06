import React from 'react';
import { Router, Route } from 'react-router';

import App from './components/App';
import About from './components/About';
import RestaurantDetail from './components/RestaurantDetail';
import NotFound from './components/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/about" component={About} />
    <Route path="/restaurant/:id/:name" component={RestaurantDetail} />
    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes;