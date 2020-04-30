const express = require('express');
const path = require('path');
const api = require('./api');

const app = express();

app.use(express.static('dist'));
// Handles any requests that don't match the ones above

app.get('/api/disorder/search', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  const { terms, sortBy } = req.query;

  api.queryName(terms, sortBy).then((rows) => {
    res.json(rows);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

app.post('/api/register', (req, res) => {
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

app.get('/api/login/:username', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  const user = api.getUser(username);
  const checkPass = hash.simpleHash(req.body.password + process.env.STATIC_SALT + user.salt);
  if (user.password == checkPass) {
    res.json(user);
    return true;
  }
  return false;
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist/index.html'));
});

module.exports = app;
