import React, { useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from './Button';
import Modal from './Modal';
import UserContext from '../context/UserContext';
import UserService from '../service/UserService';

import '../style/LoginModal.css';

function LoginModal() {
  const userContext = useContext(UserContext);

  const location = useLocation();
  const history = useHistory();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleClose = () => {
    history.push({ ...location, hash: '' });
  };

  if (location.hash !== '#login') {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('attempting login');
    UserService.login(username, password).then((user) => {
      userContext.login(user);
      handleClose();
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <Modal>
      <div className="modal-close-button">
        <div className="close"><i className="fas fa-times" onClick={handleClose} /></div>
      </div>
      <div className="login-modal-header">
        <h3 className="login-title-modal">Login with your Username</h3>
      </div>
      <div className="login-modal-body">
        <LoginForm onSubmit={handleSubmit} setUsername={setUsername} setPassword={setPassword} />
      </div>
    </Modal>
  );
}

const LoginForm = ({ onSubmit, setUsername, setPassword }) => {
  LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="username">
          <div>
            Username
          </div>
          <input className="form-control" id="username" onChange={e => setUsername(e.target.value)} />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="password">
          <div>
            Password
          </div>
          <input className="form-control" type="password" id="password" onChange={e => setPassword(e.target.value)} />
        </label>
      </div>
      <div className="registration-link">
        <a href="#registration">Registration </a>
      </div>
      <div className="form-group" id="login-button-div">
        <button className="form-control btn btn-primary" type="submit" id="button-login">
          Submit
        </button>
      </div>
    </form>
  );
};

export default LoginModal;
