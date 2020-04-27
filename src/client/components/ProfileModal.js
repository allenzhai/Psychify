import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Button from './Button';
import Modal from './Modal';

function ProfileModal() {
  const location = useLocation();
  const history = useHistory();

  const handleClose = () => {
    history.push({ ...location, hash: '' });
  };

  if (location.hash !== '#profile') {
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
        <br />
        <br />
      </div>
    </Modal>
  );
}

export default ProfileModal;
