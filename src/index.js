import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
require('node-globals').default({});

import App from './components/App';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import Line from './components/line';
import Pie from './components/pie';
import Table from './components/table';
import
Bar from './components/bar';
const routes = (
  <Route path="/reactjs-d3-universal" mapMenuTitle="Home" component={App}>
    <IndexRoute component={Home} />

    <Route path="/reactjs-d3-universal/bar" mapMenuTitle="bar" component={Bar} />
    <Route path="/reactjs-d3-universal/line" mapMenuTitle="line" component={Line} />
    <Route path="/reactjs-d3-universal/pie" mapMenuTitle="pie" component={Pie} />
    <Route path="/reactjs-d3-universal/table" mapMenuTitle="table" component={Table} />
    <Route path="*" mapMenuTitle="Page Not Found" component={PageNotFound} />
  </Route>
);


render(
  <Router
    history={browserHistory}
    routes={routes}
  />,
  document.getElementById('root'),
);
