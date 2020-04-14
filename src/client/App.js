import React, { Component } from 'react';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import { Forum } from './pages/Forum';
import { DSM } from './pages/DSM';
import { SearchResults } from './pages/SearchResults';

class App extends Component {

  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/forum" component={Forum} />
          <Route path="/dsm" component={DSM} />
          <Route path="/results" component={SearchResults} />
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App />
      </Switch>
    );
  }
}

export default App;
