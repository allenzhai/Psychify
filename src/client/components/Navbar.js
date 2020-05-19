import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import Searchbar from './Searchbar';


import '../style/Navbar.css';


function Navbar(props) {
  const path = useLocation().pathname;
  const {loggedIn, username} = props;
  const component = loggedIn
    ? (
      <>
        <a href="/profile" className="nav-item registration">{username}</a>
      </>
    ) : (
      <>
        <a href="#login" className="nav-item">Login</a>
        <a href="#registration" className="nav-item signup">Sign Up</a>
      </>
    );

  Navbar.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired
  };

  const nav = useRef(null);

  function toggleNav() {
    if (nav.current.className === 'navbar') {
      nav.current.className += '-responsive';
    } else {
      nav.current.className = 'navbar';
    }
  }

  return (
    <div>
      <div className="top-bar">
        <a className="homepage" href="/" >Psychify</a>
        <button type="button" className="icon" onClick={() => toggleNav()}>
          <i className="fas fa-bars" />
        </button>
        <nav className="navbar" ref={nav}>
          <a className="nav-item" href="/forum">Forum</a>
          <a className="nav-item" href="/dsm">Index</a>
          {component}
        </nav>
      </div>
      <Searchbar show={path} />
    </div>
  );
}

export default Navbar;
