import React, { Component, useState } from 'react';

import { Link } from 'react-router-dom';
import './style/Login.css';
import ReactModal from 'react-modal';

function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  function handleSubmit(event) {

  }

  function handleOpenLoginModal() {
    handleCloseRegistrationModal();
    if (!showLoginModal) setShowLoginModal(true);
    // document.body.style.overflowY = 'hidden';
  }

  function handleCloseLoginModal() {
    setShowLoginModal(false);
    document.body.style.overflowY = 'unset';
  }

  function handleOpenRegistrationModal() {
    handleCloseLoginModal();
    if (!showRegistrationModal) setShowRegistrationModal(true);
    // document.body.style.overflowY = 'hidden';
  }

  function handleCloseRegistrationModal() {
    setShowRegistrationModal(false);
    document.body.style.overflowY = 'unset';
  }

  function handleRegistrationClick() {
    setShowLoginModal(false);
    setShowRegistrationModal(true);
  }


  function handleClick() {

  }

  if (!loggedIn) {
    return (
      <div>
        <div className="login">
          <a onClick={handleOpenLoginModal}>Login</a>

          <ReactModal
            isOpen={showLoginModal}
            contentLabel="onRequestClose Signup Modal"
            onRequestClose={handleCloseLoginModal}
            className="login-modal"
          >
            <div className="modal-close-button">
              <button className="close" onClick={handleCloseLoginModal}>X</button>
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
              <button type="button" className="button-href" onClick={handleRegistrationClick}>Registration</button>
              <br />
              <button type="button" className="button-href">Forgot your password?</button>
              <br />
              <br />
              <button type="button" className="button-login">Login</button>
            </div>
          </ReactModal>

          <a className="profile-signup" onClick={handleOpenRegistrationModal}>Sign Up</a>
          <ReactModal
            isOpen={showRegistrationModal}
            contentLabel="onRequestClose Signup Modal"
            onRequestClose={handleCloseRegistrationModal}
            className="registration-modal"
          >
            <div className="modal-close-button">
              <button className="close" onClick={handleCloseRegistrationModal}>X</button>
            </div>
            <div className="registration-modal-header">
              <h3 className="registration-title-modal">Registration</h3>
            </div>
            <div className="registration-modal-body">
              <h3 className="registration-modal-section-header">Profile picture</h3>
              <input type="file" accept="image/*" multiple="false" />

              <h3 className="registration-modal-section-header">Username</h3>
              <input type="text" className="form-control" name="registration-password" />
              <h3 className="registration-modal-section-header">Password</h3>
              <input type="text" className="form-control" name="registration-password" />
              <h3 className="registration-modal-section-header">Email</h3>
              <input type="text" className="form-control" name="registration-email" />
              <h3 className="registration-modal-section-header">Are you a doctor?</h3>
              <div className="radio">
                <label>
                  <input type="radio" value="option1"  />
                  Yes
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value="option2" checked />
                  No
                </label>
              </div>

              <h3 className="registration-modal-section-header">Date of birth</h3>
              <input type="text" className="form-control" name="registration-dob" />
              <h3 className="registration-modal-section-header">Full Name (optional)</h3>
              <input type="text" className="form-control" name="registration-fullname" />
              <br />
              <br />
              <br />
              <label>
                <input
                  name="isGoing"
                  type="checkbox"
                />
                I acknowledge and accept terms of use
              </label>
              <br />
              <br />
              <button type="button" className="button-registration">Create Account</button>
            </div>


          </ReactModal>
        </div>
      </div>
    );
  }
  return (
    <div>
      <nav className="profile">
        <a href="/">{username}</a>
      </nav>
    </div>
  );
}

export default Login;
