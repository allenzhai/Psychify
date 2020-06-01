import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';
import Button from './Button';
import Modal from './Modal';

import '../style/RegistrationModal.css';

function RegistrationModal() {
  const location = useLocation();
  const history = useHistory();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleClose = () => {
    history.push({ ...location, hash: '' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('attempting registration');
    const data = {
      username,
      password,
      email
    };
    console.log(data);
    const request = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.toString().length.toString()
      },
      body: JSON.stringify(data)
    };
    console.log('attempting fetch');
    fetch('/api/register', request)
      .then(() => {
        console.log('registration successful');
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log('done with fetch');
  };

  if (location.hash !== '#registration') {
    return null;
  }

  return (
    <Modal isOpen autoFocus>
      <div className="modal-close-button">
        <Button className="close" onClick={handleClose}>X</Button>
      </div>
      <div className="registration-modal-header">
        <h3 className="registration-title-modal">Registration</h3>
      </div>
      <div className="registration-modal-body">
        <RegistrationForm
          onSubmit={handleSubmit}
          setUsername={setUsername}
          setPassword={setPassword}
          setEmail={setEmail}
        />
      </div>
    </Modal>
  );
}

const RegistrationForm = ({
  onSubmit, setUsername, setEmail, setPassword, setVerfifed
}) => {
  RegistrationForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setEmail: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    setVerfifed: PropTypes.func.isRequired
  };

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="col-left">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={imageUploader}
          style={{
            display: 'none'
          }}
        />
        <div
          className="profile-user-image-display"
          role="button"
          tabIndex={0}
          onClick={() => imageUploader.current.click()}
          onKeyDown={() => imageUploader.current.click()}
        >
          <img
            alt="Click to Upload Profile Pic"
            ref={uploadedImage}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      </div>
      <div className="col-right">
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
        <div className="form-group">
          <label htmlFor="email">
            <div>
              Email address
            </div>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={e => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="verified">
            <div>
              Are you a doctor?
            </div>
            <select type="verified" className="form-control" id="verified">
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <button className="form-control btn btn-primary" type="submit" id="button-registration">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegistrationModal;
