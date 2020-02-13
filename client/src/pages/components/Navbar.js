import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './style/Navbar.css';

export class Navbar extends React.Component {

    render() {
      return (
        <div>
          <nav className="navbar">
            <a href="/">Home</a>
            <a href="/forum">Forum</a>
            <a href="/dsm">Index</a>
            <a href="/">Login</a>
            <a className="profile-signup" href="/">Sign Up</a>
          </nav>
        </div>
      );
    }
}