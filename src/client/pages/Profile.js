import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

import Button from '../components/Button';

import '../style/Profile.css';

function Profile() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [about, setAbout] = useState();
  const [name, setName] = useState();
  const [loc, setLocation] = useState();
  const [verified, setVerified] = useState();
  const [DOB, setDOB] = useState();
  const [ID] = useState(2);

  const endPoint = `/api/getProfile/${ID}`;
  const [isLoading, data, error] = useFetch(endPoint);
  const dataList = data || [];


  useEffect(() => {
    setUsername(dataList.Username);
    setEmail(dataList.Email);
    setAbout(dataList.About);
    setName(dataList.FirstName);
    setLocation(dataList.Locat);
    setDOB(dataList.DOB);
    setVerified(dataList.Type);
  }, [dataList.About, dataList.DOB, dataList.Email, dataList.FirstName, dataList.Locat,
    dataList.Type, dataList.Username]);

  let verifiedStatus;
  if (verified === 1) {
    verifiedStatus = <h3 className="profile-verified-yes"> &#x2714; Verified</h3>;
  } else {
    verifiedStatus = <h3 className="profile-verified-no">  &#10007; Not Verified</h3>;
  }

  const handleUpdate = (event) => {
    const updatePoint = `/api/updateProfile/${ID}`;
    event.preventDefault();
    const profileData = {
      email,
      username,
      about,
      name,
      loc,
      DOB,
      ID
    };
    const request = {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': profileData.toString().length.toString()
      },
      body: JSON.stringify(profileData)
    };
    fetch(updatePoint, request);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAboutChange = (event) => {
    setAbout(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLocChange = (event) => {
    setLocation(event.target.value);
  };

  const handleDOBChange = (event) => {
    setDOB(event.target.value);
  };

  if (error) {
    console.log(error);
  }


  return (
    <div>
      <div className="profile-card">
        <div className="profile-modal-body">
          <div className="col-left">
            <h3 className="profile-modal-section-header">Profile picture</h3>
            <img src="/src/client/style/images/sample_profile_pic.png" alt="profile pic" />
            <br />
            <a href="#profilePicEdit">Edit</a>
            {' '}
            |
            {' '}
            <a href="#profilePicRemove">Remove</a>
            <br />
            <br />
            {dataList.Username}
            <br />
            {dataList.Email}
            <br />
            <br />
          </div>
          <div className="col-right">
            <h3 className="profile-modal-section-header">About</h3>
            <textarea className="about" value={about} onChange={handleAboutChange} />
            <br />
            <br />
            <h3 className="profile-modal-section-header">Personal Information</h3>
            <div className="profile-personal-info">
              <h3 className="profile-modal-section-header">Name</h3>
              <input type="text" value={name} onChange={handleNameChange} className="form-control" name="profile-fullname" />
              <h3 className="profile-modal-section-header">Username</h3>
              <input type="text" value={username} onChange={handleUsernameChange} className="form-control" name="profile-username" />
              <h3 className="profile-modal-section-header">Email</h3>
              <input type="text" value={email} onChange={handleEmailChange} className="form-control" name="profile-email" />
              <h3 className="profile-modal-section-header">Location</h3>
              <input type="text" value={loc} onChange={handleLocChange} className="form-control" name="profile-location" />
              {verifiedStatus}
              <h3 className="profile-modal-section-header">Date of birth</h3>
              <input value={DOB} onChange={handleDOBChange} type="text" className="form-control" name="profile-dob" />
              <br />
              <br />
              <br />
              <Button className="button-update-info" onClick={handleUpdate}>Update Information</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
