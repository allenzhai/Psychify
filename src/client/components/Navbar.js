import React, { useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import Searchbar from './Searchbar';
import UserContext from '../context/UserContext';
import UserService from '../service/UserService';

import '../style/Navbar.css';

function Navbar() {
  const userContext = useContext(UserContext);
  const { user, login } = userContext;
  if (!user) {
    // user is not logged in.
    // attemp to use token in cookie to identify the current user
    UserService.identify().then((userData) => {
      console.log(userData);
      login(userData);
    }).catch((err) => {
      // user not logged in.
      console.log(err);
    });
  }


  const path = useLocation();
  const component = user
    ? (
      <>
        <a href="/profile" className="nav-item registration">{user}</a>
      </>
    ) : (
      <>
        <a href="#login" className="nav-item">Login</a>
        <a href="#registration" className="nav-item signup">Sign Up</a>
      </>
    );

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
        <a className="homepage" href="/">Psychify</a>
        <button type="button" className="icon" onClick={() => toggleNav()}>
          <i className="fas fa-bars" />
        </button>
        <nav className="navbar" ref={nav}>
          <a className="nav-item" href="/forum">Forum</a>
          <a className="nav-item" href="/dsm">Index</a>
          {component}
        </nav>
      </div>
      <Searchbar show={path.pathname} />
    </div>
  );
}

export default Navbar;
