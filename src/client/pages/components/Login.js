import React from 'react';

import './style/Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: 'Username',
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {

  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <div>
          <nav className="login">
            <a href="/">Login</a>
            <a className="profile-signup" href="" onClick={this.handleClick}>Sign Up</a>
          </nav>
        </div>
      );
    } else {
      return (
        <div>
          <nav className="profile">
            <a href="/">{this.state.username}</a>
          </nav>
        </div>
      );
    }
  }
}

export default Login;
