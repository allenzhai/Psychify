import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Login} from './Login';
import './style/Navbar.css';

export class Navbar extends React.Component {

    render() {
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
}