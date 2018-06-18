import React, { Component } from 'react';
import Header from '../components/Header';
import Signup from './Signup';
import Feed from './Feed';
import NotFound from './NotFound';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { RoutePrivate } from '../components/RoutePrivate';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Signup} />
              <Route path="/signup" component={Signup} />
              <RoutePrivate path="/feed" component={Feed} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
