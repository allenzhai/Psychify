import React, { useState } from 'react';

import '../style/Navbar.css';

function Navbar(props) {
  const { loggedIn, username } = props;

  console.log(props);
  const component = loggedIn
    ? (
      <nav className="profile">
        <a href="/">{username}</a>
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
