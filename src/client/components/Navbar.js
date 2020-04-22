import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import '../style/Navbar.css';

function Navbar() {
  return (
    <div className="top-bar">
      <a className="homepage" href="/">Psychify</a>
      <nav className="navbar">
        <a className="nav-item" href="/forum">Forum</a>
        <a className="nav-item" href="/dsm">Index</a>
        <div className="login-tile"><Login /></div>
      </nav>
    </div>
  );
}

export default Navbar;
