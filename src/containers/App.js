import React, { Component } from 'react';
import Header from '../components/Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signup from './Signup';
import Feed from './Feed';
import { RoutePrivate } from '../components/RoutePrivate';
import NotFound from './NotFound';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header/>
            <Switch>
              <Route exact path="/" component={Signup} />
              <Route path="/signup" component={Signup} />
              <RoutePrivate path="/feed" component={Feed} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
