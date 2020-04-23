import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from './Button';
import Modal from './Modal';

function RegistrationModal() {
  const history = useHistory();
  const params = new URLSearchParams(history.location.search);

  const handleClose = () => {
    history.push(history.location.pathname);
  };


  const handleSubmit = () => {
    const request = {
      method: 'POST',
      mode: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: {
        username: 'test',
        password: 'test',
        email: 'test'
      }
    };
    fetch('http://localhost:5000/api/register', request);
    console.log('registration successful');
  };

  if (!params.get('registration')) {
    return null;
  }

  return (
    <Modal>
      <div className="modal-close-button">
        <Button className="close" onClick={handleClose}>X</Button>
      </div>
      <div className="registration-modal-header">
        <h3 className="registration-title-modal">Registration</h3>
      </div>
      <div className="registration-modal-body">
        <h3 className="registration-modal-section-header">Profile picture</h3>
        <input type="file" accept="image/*" multiple="false" />
        <h3 className="registration-modal-section-header">Username</h3>
        <input type="text" className="form-control" name="registration-username" />
        <h3 className="registration-modal-section-header">Password</h3>
        <input type="text" className="form-control" name="registration-password" />
        <h3 className="registration-modal-section-header">Email</h3>
        <input type="text" className="form-control" name="registration-email" />
        <h3 className="registration-modal-section-header">Are you a doctor?</h3>
        <div className="radio">
          <label htmlFor="radioOption1">
            <input type="radio" value="option1" id="radioOption1" />
            Yes
          </label>
        </div>
        <div className="radio">
          <label htmlFor="radioOption2">
            <input type="radio" value="option2" id="radioOption1" checked />
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
        <label htmlFor="acceptCheckbox">
          <input name="isGoing" type="checkbox" id="acceptCheckbox" />
          I acknowledge and accept terms of use
        </label>
        <br />
        <br />
        <Button className="button-registration" onClick={handleSubmit}>Create Account</Button>
      </div>
    </Modal>
  );
}

export default RegistrationModal;
