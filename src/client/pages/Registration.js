/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../components/Button';
import UserContext from '../context/UserContext';
import UserService from '../service/UserService';

import '../style/Registration.css';

export default function Registration() {
  const userContext = useContext(UserContext);
  const history = useHistory();
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    UserService.register(username, email, password).then((user) => {
      userContext.login(user);
      history.push({ pathname: '/' });
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="registration-body">
      <h1>Create your account</h1>
      <div className="registration-content mt-3">
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
            <label htmlFor="inputEmail" className="form-control-required">Email</label>
            <input
              className="form-control"
              id="inputEmail"
              type="email"
              placeholder="email"
              required
              autoComplete="off"
              onChange={e => setEmail(e.target.value)}
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

          <div className="form-group">
            <label htmlFor="verified">Are you a doctor?</label>
            <select type="verified" className="form-control" id="verified">
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          <div className="form-group">
            <Button className="btn btn-block" type="submit" onClick={handleSubmit}>Sign Up</Button>
          </div>
        </form>
      </div>

    </div>
  );
}
