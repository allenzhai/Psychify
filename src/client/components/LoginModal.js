import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import Button from './Button';
import Modal from './Modal';

import '../style/LoginModal.css';

function LoginModal(props) {
  const location = useLocation();
  const history = useHistory();

  const handleClose = () => {
    history.push({ ...location, hash: '' });
  };

  if (location.hash !== '#login') {
    return null;
  }

  const handleSubmit = () => {
    console.log("attempting login");
    const data = {
      'username': 'test',
      'password': 'test'
    }
    const request = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json',
        'Content-Length': data.toString().length.toString()},
      body: JSON.stringify(data)
    };
    fetch('http://localhost:5000/api/login', request)
      .then((response) => {
        console.log(response);
        if (response.status == 201){
          handleClose();
          console.log('login successful');
          props.loginUser();
        }
        else {
          console.log('login unsuccessful');
        }
    })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Modal>
      <div className="modal-close-button">
        <Button className="close" onClick={handleClose}>X</Button>
      </div>
      <div className="login-modal-header">
        <h3 className="login-title-modal">Login with your email address</h3>
      </div>
      <div className="login-modal-body">
        <h3 className="login-modal-section-header">Email</h3>
        <input type="text" className="form-control" name="login-username" />
        <h3 className="login-modal-section-header">Password</h3>
        <input type="text" className="form-control" name="login-password" />
        <br />
        <a href="#registration">Registration</a>
        <br />
        <a href="#registration">Forgot your password?</a>
        <br />
        <br />
        <Button className="button-login" onClick={handleSubmit}>Login</Button>
      </div>
    </Modal>
  );
}

export default LoginModal;
