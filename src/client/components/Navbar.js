import React, { useState } from 'react';

import '../style/Navbar.css';

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [username, setUsername] = useState('Username');

  const component = loggedIn
    ? (
      <nav className="profile">
        <a href="#profile" className="nav-item registration">{username}</a>
      </nav>
    ) : (
      <>
        <a href="#login" className="nav-item">Login</a>
        <a href="#registration" className="nav-item signup">Sign Up</a>
      </>
    );

  return (
    <div className="top-bar">
      <a className="homepage" href="/">Psychify</a>
      <nav className="navbar">
        <a className="nav-item" href="/forum">Forum</a>
        <a className="nav-item" href="/dsm">Index</a>
        {component}
      </nav>
    </div>
  );
}

export default Navbar;
