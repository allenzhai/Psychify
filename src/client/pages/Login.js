/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../components/Button';
import UserContext from '../context/UserContext';
import UserService from '../service/UserService';

import '../style/Login.css';

export default function Login() {
  const userContext = useContext(UserContext);
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('attempting login');
    UserService.login(username, password).then((user) => {
      userContext.login(user);
      history.push({ pathname: '/' });
    }).catch((error) => {
      setErr(error);
    });
  };

  const errUI = err === undefined ? '' : <p className="error">{err.message}</p>;

  return (
    <div className="login-body">
      <h1>Sign In to Psychify</h1>
      <div className="login-content mt-3 px-2 py-1">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="inputUsername" className="form-control-required">Username</label>
            <input
              className="form-control"
              id="inputUsername"
              placeholder="username"
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="intputPassword" className="form-control-required">Password</label>
            <input
              className="form-control"
              id="intputPassword"
              type="password"
              placeholder="Password"
              required
              autoComplete="off"
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {errUI}

          <div className="form-group">
            <Button className="btn btn-block" type="submit" onClick={handleSubmit}>Sign In</Button>
          </div>
        </form>
      </div>

      <div className="login-foot mt-2 px-1 py-1">
        <span className="mr-1">New to Psychify?</span>
        <a className="btn-link" href="/registration">
          Register
        </a>
      </div>
    </div>
  );
}
