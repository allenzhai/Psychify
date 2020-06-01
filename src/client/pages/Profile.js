import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

import Button from '../components/Button';
import UserContext from '../context/UserContext';

import '../style/Profile.css';

function Profile() {
  const userContext = useContext(UserContext);
  const { token, user, ID } = userContext;

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [about, setAbout] = useState();
  const [name, setName] = useState();
  const [loc, setLocation] = useState();
  const [verified, setVerified] = useState();
  const [DOB, setDOB] = useState();


  // const [ID] = useState(userContext.ID);

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
    <div>
      <div className="profile-card">
        <div className="profile-modal-body">
          <div className="col-left">
            <h3 className="profile-modal-section-header">Profile picture</h3>
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
                alt="ProfilePicture"
                ref={uploadedImage}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
            <button
              className="profile-user-image-edit-button"
              type="button"
              onClick={() => imageUploader.current.click()}
            >
              Edit
            </button>
            {' '}
            |
            {' '}
            <button
              className="profile-user-image-edit-button"
              type="button"
              onClick={() => imageUploader.current.click()}
            >
              Remove
            </button>
            <pre>
              <div className="profile-div-white-space">
                {dataList.Username}
              </div>

              <div className="profile-div-white-space">
                {dataList.Email}
              </div>
            </pre>
          </div>
          <div className="col-right">
            <h3 className="profile-modal-section-header">About</h3>
            <textarea className="about" value={about} onChange={handleAboutChange} />
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

              <div className="profile-update-info-button">
                <Button className="button-update-info" onClick={handleUpdate}>Update Information</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
