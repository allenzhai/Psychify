import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import Button from './Button';
import Modal from './Modal';

import '../style/LoginModal.css';

function LoginModal() {
  const location = useLocation();
  const history = useHistory();

  const handleClose = () => {
    history.push({ ...location, hash: '' });
  };

  if (location.hash !== '#login') {
    return null;
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
        <Button className="button-login">Login</Button>
      </div>
    </Modal>
  );
}

export default LoginModal;
