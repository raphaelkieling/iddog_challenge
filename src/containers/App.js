import React, { Component } from 'react';
import Header from '../components/Header';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Login from './Login';
import Galery from './Galery';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/galery" component={Galery} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
