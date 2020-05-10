const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const api = require('./api');
const hash = require('./hash');

const app = express();

app.use(cors());
app.use(bodyParser.json());
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

app.get('/api/getProfile/:ID', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  const { ID } = req.params;
  api.getProfile(ID).then((rows) => {
    res.json(rows[0]);
  });
});

app.put('/api/updateProfile/:ID', (req) => {
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

//  Forum
app.get('/api/forum/posts', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  api.listPosts().then((rows) => {
    res.json(rows);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

app.get('/api/forum/post/:id', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.json({ post: 'request for specific post - to display on its own page' });
});

app.get('/api/forum/post/comments/:postID', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  const { postID } = req.params;
  api.getComments(postID).then((rows) => {
    res.json(rows);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

app.post('/api/forum/create/post', (req, res) => {
  const post = {
    title: req.body.title,
    body: req.body.body,
    category: req.body.category,
    author: req.body.author,
  };
  api.createPost(post);
  res.json(post);
});

app.post('/api/forum/create/comment', (req, res) => {
  const comment = {
    body: req.body.body,
  };
  api.createComment(comment);
  res.json(comment);
});


app.post('/api/register', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
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
    if (user !== undefined) {
      const checkPass = hash.simpleHash(req.body.password + process.env.STATIC_SALT + user.salt);
      if (user.password === checkPass) {
        res.status(201).send({ message: 'successful login' });
      }
    } else res.status(401).send({ message: 'invalid login creds' });
  }).catch((err) => {
    console.log(err);
  });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist/index.html'));
});

module.exports = app;
