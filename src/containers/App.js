import React, { Component } from 'react';
import Header from '../components/Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signup from './Signup';
import Feed from './Feed';
import { RoutePrivate } from '../components/RoutePrivate';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header/>
            <Switch>
              <Route path="/signup" component={Signup}/>
              <RoutePrivate path="/feed" component={Feed} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
