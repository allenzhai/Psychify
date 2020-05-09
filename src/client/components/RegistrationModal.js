import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';
import Button from './Button';
import Modal from './Modal';

import '../style/RegistrationModal.css';

function RegistrationModal(props) {
  const location = useLocation();
  const history = useHistory();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  RegistrationModal.propTypes = {
    loginUser: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired
  };

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
        props.loginUser();
        props.setUsername(username);
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
  onSubmit, setUsername, setEmail, setPassword
}) => {
  RegistrationForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setEmail: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="username">
          Username
          <input className="form-control" id="username" onChange={e => setUsername(e.target.value)} />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="password">
          Password
          <input className="form-control" id="password" onChange={e => setPassword(e.target.value)} />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="email">
          Email address
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
        <button className="form-control btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default RegistrationModal;
