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
import UserContext from './userContext';

export default function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [username, changeUsername] = React.useState('');

  function loginUser() {
    setLoggedIn(true);
  }

  function setUsername(user) {
    changeUsername(user);
  }


  return (
    <>
      <UserContext.Provider value={UserContext.token}>
        <Navbar loggedIn={loggedIn} username={username} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/forum" component={Forum} />
          <Route path="/dsm" component={DSM} />
          <Route path="/profile" component={Profile} />
          <Route path="/results" component={SearchResults} />
        </Switch>
        <Route path="/" render={props => <LoginModal {...props} loginUser={loginUser} setUsername={setUsername} />} />
        <Route path="/" render={props => <RegistrationModal {...props} loginUser={loginUser} setUsername={setUsername} />} />
      </UserContext.Provider>
    </>
  );
}
