const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const api = require('./api');
const hash = require('./hash');
const userRouter = require('./router/user');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));

app.use(userRouter);
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
  api.updateProfile(profile).then((rows) => {
    console.log(rows);
  }).catch((err) => {
    console.log(err);
  });
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

app.get('/api/forum/posts/:category', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  const { category } = req.params;
  api.listPostsFromCategory(category).then((rows) => {
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
    date: req.body.date,
  };
  api.createPost(post);
  res.json(post);
});

app.post('/api/forum/create/comment', (req, res) => {
  const comment = {
    body: req.body.body,
    date: req.body.date,
    author: req.body.author,
    linkedPost: req.body.linkedPost,
  };
  api.createComment(comment);
  res.json(comment);
});

app.get('/api/disorder/names', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  api.getDisorderNames().then((rows) => {
    res.json(rows);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

app.get('/api/disorder/:letter', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  const { letter } = req.params;
  api.listIndexOfDisorders(letter).then((rows) => {
    res.json(rows);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist/index.html'));
});

module.exports = app;
