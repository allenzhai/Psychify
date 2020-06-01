const express = require('express');
const jwt = require('jsonwebtoken');
const api = require('../api');
const hash = require('../hash');
const Code = require('./code');
const verifyToken = require('./verifyToken');

const router = express.Router();

router.post('/api/register', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  const dynamicSalt = hash.generateSalt();
  const user = {
    username: req.body.username,
    passwordHash: hash.passwordHash(req.body.password + process.env.STATIC_SALT + dynamicSalt),
    email: req.body.email,
    salt: dynamicSalt
  };
  api.registerUser(user);
  res.json(user);
});

router.post('/api/login', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  const { username, password } = req.body;

  api.getUser(username).then((users) => {
    if (users.length !== 1) {
      throw new Error('Invalid login credentials.');
    }

    let user = users[0];
    const checkPass = hash.passwordHash(password + process.env.STATIC_SALT + user.salt);
    if (user.password !== checkPass) {
      throw new Error('Invalid login credentials.');
    }
    console.log('passwords match');
    const token = jwt.sign({ user }, process.env.SECRET_KEY);
    user = { token, ...user };
    res.status(201).json({ code: Code.SUCCEEDED, message: 'successful login', user });
  }).catch((err) => {
    res.json({ code: Code.LOGIN_FAILED, message: err.message });
  });
});

router.get('/api/getProfile/:ID', verifyToken, (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  const { ID } = req.params;
  api.getProfile(ID).then((rows) => {
    res.json(rows[0]);
  }).catch((err) => {
    res.json({ code: Code.FAILED, message: err.message });
  });
});

router.put('/api/updateProfile/:ID', (req) => {
  const profile = {
    email: req.body.email,
    username: req.body.username,
    about: req.body.about,
    name: req.body.name,
    loc: req.body.loc,
    DOB: req.body.DOB,
    ID: req.body.ID
  };
  console.log('profile', profile);
  api.updateProfile(profile);
});

module.exports = router;
