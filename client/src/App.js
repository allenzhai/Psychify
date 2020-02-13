import React, {Component} from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import {Home} from './pages/Home';
import {Forum} from './pages/Forum';
import {DSM} from './pages/DSM';

class App extends Component {

  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/forum" component={Forum} />
        <Route exact path="/dsm" component={DSM} />
      </Router>

    );
  }
}

export default App;
