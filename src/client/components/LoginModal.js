import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from './Button';
import Modal from './Modal';

import '../style/LoginModal.css';

function LoginModal() {
  const history = useHistory();
  const params = new URLSearchParams(history.location.search);

  const handleClose = () => {
    history.push(history.location.pathname);
  };

  if (!params.get('login')) {
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
        <a href="?registration=true">Registration</a>
        <br />
        <a href="?registration=true">Forgot your password?</a>
        <br />
        <br />
        <Button className="button-login">Login</Button>
      </div>
    </Modal>
  );
}

export default LoginModal;
