/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../components/Button';
import UserContext from '../context/UserContext';
import UserService from '../service/UserService';

import '../style/Login.css';

export default function Login() {
  const userContext = useContext(UserContext);
  const history = useHistory();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('attempting login');
    UserService.login(username, password).then((user) => {
      userContext.login(user);
      history.push({ pathname: '/' });
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="login-body">
      <div className="login-content mt-5 px-2 py-1">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="inputUsername">Username</label>
            <input
              className="login-form-control"
              id="inputUsername"
              placeholder="username"
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="intputPassword">Password</label>
            <input
              className="login-form-control"
              id="intputPassword"
              type="password"
              placeholder="Password"
              required
              autoComplete="off"
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <Button className="btn btn-block" type="submit" onClick={handleSubmit}>Sign In</Button>
          </div>
        </form>
      </div>

      <div className="login-foot mt-2 px-1 py-1">
        <span className="mr-1">New to Psychify?</span>
        <a className="btn-link" href="#registration">
          Register
        </a>
      </div>
    </div>
  );
}
