import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Forum from './pages/Forum';
import DSM from './pages/DSM';
import SearchResults from './pages/SearchResults';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/forum" component={Forum} />
        <Route path="/dsm" component={DSM} />
        <Route path="/results" component={SearchResults} />
      </Switch>
    </div>
  );
}
