const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const api = require('./api');
const hash = require('./hash');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));
// Handles any requests that don't match the ones above

app.get('/api/disorders', (req, res) => {
  api.listDisorders().then((rows) => {
    res.json(rows);
  }).catch((err) => {
    console.log(err);
    // should return user friendly error message here.
    // future change is needed here;
    res.json(err);
  });
});

app.get('/api/searchDisorderName/:disorder', (req, res) => {
  const { disorder } = req.params;

  api.queryName(terms, sortBy).then((rows) => {
    res.json(rows);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

app.post('/api/register', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  console.log(req);
  console.log(res);
  console.log(req.body);
  const dynamicSalt = hash.generateSalt();
  const user = {
    username: req.body.username,
    passwordHash: hash.simpleHash(req.body.password + process.env.STATIC_SALT + dynamicSalt),
    email: req.body.email,
    salt: dynamicSalt
  };
  api.registerUser(user);
  res.json(user);
});

app.post('/api/login', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  const { username } = req.body;

  api.getUser(username).then((users) => {
    const user = users[0];
    const checkPass = hash.simpleHash(req.body.password + process.env.STATIC_SALT + user.salt);
    if (user.password === checkPass) {
      res.status(201).send({ message: 'successful login' });
    } else {
      res.status(401).send({ message: 'invalid login creds' });
    }
  }).catch((err) => {
    console.log(err);
  });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist/index.html'));
});

module.exports = app;
