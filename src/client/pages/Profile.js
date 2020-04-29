import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Searchbar from '../components/Searchbar';


import Button from '../components/Button';

import '../style/Profile.css';

function Profile() {
  const location = useLocation();
  const history = useHistory();
  const [username, setUsername] = useState('Username');
  const [email, setEmail] = useState('username@gmail.com');
  const [about, setAbout] = useState('Ernest Miller Hemingway (July 21, 1899 – July 2, 1961) was an American journalist, novelist, short-story writer, and sportsman. His economical and understated style—which he termed the iceberg theory—had a strong influence on 20th-century fiction, while his adventurous lifestyle and his public image brought him admiration from later generations. Hemingway produced most of his work between the mid-1920s and the mid-1950s, and he won the Nobel Prize in Literature in 1954. He published seven novels, six short-story collections, and two nonfiction works. Three of his novels, four short-story collections, and three nonfiction works were published posthumously. Many of his works are considered classics of American literature. ');

  const handleEdit = () => {
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

  return (
    <body>
      <Navbar />
      <div className="profile-card">
        <main>
          <div className="registration-modal-body">
            <div className="col-left">
              <h3 className="registration-modal-section-header">Profile picture</h3>
              <img src="/src/client/style/images/sample_profile_pic.png" alt="profile pic" />
              <br />
              <a href="#profilePicEdit">Edit</a>
              {' '}
              |
              {' '}
              <a href="#profilePicRemove">Remove</a>
              <br />
              <br />
              {username}
              <br />
              {email}
              <br />
              <br />
            </div>
            <div className="col-right">
              <h3 className="registration-modal-section-header">About</h3>
              <textarea className="about" readOnly value={about} />
              <br />
              <br />
              <h3 className="registration-modal-section-header">Personal Information</h3>
              <div className="registration-personal-info">
                <h3 className="registration-modal-section-header">Name</h3>
                <input type="text" className="form-control" name="registration-fullname" />
                <h3 className="registration-modal-section-header">Username</h3>
                <input type="text" className="form-control" name="registration-username" />
                <h3 className="registration-modal-section-header">Email</h3>
                <input type="text" className="form-control" name="registration-email" />
                <h3 className="registration-modal-section-header">Occupation</h3>
                <input type="text" className="form-control" name="profile-occupation" />
                <h3 className="registration-modal-section-header">Location</h3>
                <input type="text" className="form-control" name="profile-location" />
                <h3 className="registration-modal-section-header">Verified?</h3>
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
                <input type="text" className="form-control" name="profile-dob" />
                <br />
                <br />
                <br />
                <Button className="button-update-info" onClick={handleEdit}>Update Information</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </body>
  );
}

export default Profile;
