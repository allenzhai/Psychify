import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Forum from './pages/Forum';
import DSM from './pages/DSM';
import SearchResults from './pages/SearchResults';
import LoginModal from './components/LoginModal';
import RegistrationModal from './components/RegistrationModal';
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
        <Route path="/forum" component={Forum} />
        <Route path="/dsm" component={DSM} />
        <Route path="/profile" component={Profile} />
        <Route path="/results" component={SearchResults} />
        <Route path="/disorderPage" component={DisorderPage} />
      </Switch>
      <Route path="/" component={LoginModal} />
      <Route path="/" component={RegistrationModal} />
    </UserContextProvider>
  );
}
