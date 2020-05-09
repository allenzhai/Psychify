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

export default function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [username, changeUsername] = React.useState('');
  const [token, changeToken] = React.useState('');

  function loginUser() {
    setLoggedIn(true);
  }

  function setUsername(user) {
    changeUsername(user);
  }

  // User Context
  const UserContext = React.createContext({
    username: { username },
    loggedIn: { loggedIn },
    token: { token },
    changeToken: { changeToken }
    // ^ dependent on our implementation and whether or not we will need this method
    // This is automatically passed with the context.

    // Will be providing in App.js by wrapping child components with a provider:
    /* <UserContext.Provider value={token, changeToken}>
            <Layout />
          </UserContext.Provider> */

    // on value change of 'token', child props will be rerendered

    // For context consumption:
    /* <UserContext.Consumer>
              {token => (
                <childElement token = {token} />
              )}
            </UserContext.Consumer> */
  });

  return (
    <>
      <UserContext.Provider value={token}>
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
