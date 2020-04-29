import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Button from './Button';
import Modal from './Modal';
import ReactDOM from 'react-dom';
import RegistrationForm from './RegistrationForm';

function RegistrationModal(props) {
  const location = useLocation();
  const history = useHistory();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(true);

  console.log(props);

  const handleClose = () => {
    setIsOpen(false);
    history.push({ ...location, hash: '' });
  };

  const handleSubmit = () => {
    console.log("attempting registration");
    const data = {
      'username': username,
      'password': password,
      'email': email
    }
    const request = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json',
        'Content-Length': data.toString().length.toString()},
      body: JSON.stringify(data)
    };
    console.log("attempting fetch");
    fetch('http://localhost:5000/api/register', request)
      .then(() => {
        handleClose();
        console.log('registration successful');
        props.loginUser();
    })
      .catch((err) => {
        console.log(err);
      });
    console.log("done with fetch");
  }

  if (location.hash !== '#registration') {
    return null;
  }

  return (
    <Modal isOpen={true} autoFocus={true}>
      <div className="modal-close-button">
        <Button className="close" onClick={handleClose}>X</Button>
      </div>
      <div className="registration-modal-header">
        <h3 className="registration-title-modal">Registration</h3>
      </div>
      <div className="registration-modal-body">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="name">Name</label>
          <input className="form-control" id="name" onChange={(e) => {
            console.log(e);
            setUsername(e.target.value);}}/>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email"
           placeholder="name@example.com"
          />
      </div>
        <div className="form-group">
          <button className="form-control btn btn-primary" type="submit">
            Submit
          </button>
      </div>
      </form>

        <h3 className="registration-modal-section-header">Profile picture</h3>
        <input type="file" accept="image/*" multiple={false} />
        <h3 className="registration-modal-section-header">Username</h3>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
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
