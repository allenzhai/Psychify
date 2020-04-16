import React from 'react';
import Login from './Login';
import './style/Navbar.css';

function Navbar() {
  return (
    <div className="top-bar">
      <a className="homepage" href="/">Psychify</a>
      <nav className="navbar">
        <a className="nav-item" href="/forum">Forum</a>
        <a className="nav-item" href="/dsm">Index</a>
        <a className="login-tile" href="/"><Login /></a>
      </nav>
    </div>
  );
}

export default Navbar;
