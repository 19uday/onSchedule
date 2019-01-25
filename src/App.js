import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './main.css';
import Routes from './Routes';
import Login from './Login';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Landing from './Landing';

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Route
          exact path='/'
          component={() => <Landing />}
        />

        <Route
          exact path='/routes'
          component={() => <Routes />}
        />
      </div>
      </Router>
    );
  }
}

export default App;
