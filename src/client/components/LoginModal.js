import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';
import Button from './Button';
import Modal from './Modal';

import '../style/LoginModal.css';

function LoginModal(props) {
  const location = useLocation();
  const history = useHistory();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  LoginModal.propTypes = {
    loginUser: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired
  };

  const handleClose = () => {
    history.push({ ...location, hash: '' });
  };

  if (location.hash !== '#login') {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('attempting login');
    const data = {
      username,
      password,
    };
    const request = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.toString().length.toString()
      },
      body: JSON.stringify(data)
    };
    fetch('/api/login', request)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          console.log('login successful');
          props.loginUser();
          props.setUsername(username);
          handleClose();
        } else {
          console.log('login unsuccessful');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal>
      <div className="modal-close-button">
        <Button className="close" onClick={handleClose}>X</Button>
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
          <input className="form-control" id="password" onChange={e => setPassword(e.target.value)} />
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
