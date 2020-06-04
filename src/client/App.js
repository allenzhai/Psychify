import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Forum from './pages/Forum';
import DSM from './pages/DSM';
import SearchResults from './pages/SearchResults';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import DisorderPage from './pages/DisorderPage';
import { UserContextProvider } from './context/UserContext';

export default function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Route path="/forum" component={Forum} />
        <Route path="/dsm" component={DSM} />
        <Route path="/profile" component={Profile} />
        <Route path="/results" component={SearchResults} />
        <Route path="/disorderPage" component={DisorderPage} />
      </Switch>
    </UserContextProvider>
  );
}
