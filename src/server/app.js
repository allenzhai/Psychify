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

app.get('/api/getProfile/:ID', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  const { ID } = req.params;
  api.getProfile(ID).then(( rows) => {
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
  res.json([{
    title: 'Lorem ispsum this is a post title',
    author: 'username',
    age: '20h',
    category: 'Anxiety',
    likes: '1'
  },
  {
    title: 'Lorem ispsum this is a post title',
    author: 'username',
    age: '20h',
    category: 'Anxiety',
    likes: '1'
  },
  {
    title: 'Lorem ispsum this is a post title',
    author: 'username',
    age: '20h',
    category: 'Anxiety',
    likes: '1'
  },
  {
    title: 'Lorem ispsum this is a post title',
    author: 'username',
    age: '20h',
    category: 'Anxiety',
    likes: '1'
  },
  {
    title: 'Lorem ispsum this is a post title',
    author: 'username',
    age: '20h',
    category: 'Anxiety',
    likes: '1'
  },
  {
    title: 'Lorem ispsum this is a post title',
    author: 'username',
    age: '20h',
    category: 'Anxiety',
    likes: '1'
  },
  {
    title: 'Lorem ispsum this is a post title',
    author: 'username',
    age: '20h',
    category: 'Anxiety',
    likes: '1'
  },
  {
    title: 'Lorem ispsum this is a post title',
    author: 'username',
    age: '20h',
    category: 'Anxiety',
    likes: '1'
  },
  {
    title: 'Lorem ispsum this is a post title',
    author: 'username',
    age: '20h',
    category: 'Anxiety',
    likes: '1'
  }]);
});

app.get('/api/forum/post/:id', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.json({ post: 'request for specific post - to display on its own page' });
});

app.get('/api/forum/post/comments/:id', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.json([{ author: 'username', age: '2h', text: 'sample comment text lorem ipsum dolem blah blah lots of text' },
    { author: 'username', age: '2h', text: 'sample comment text lorem ipsum dolem blah blah lots of text' },
    { author: 'username', age: '2h', text: 'sample comment text lorem ipsum dolem blah blah lots of text' },
    { author: 'username', age: '2h', text: 'sample comment text lorem ipsum dolem blah blah lots of text' },]);
});

app.post('/api/forum/create/post', (req, res) => {
  const post = {
    title: req.body.title,
    body: req.body.body,
    category: req.body.category,
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

app.get('/*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist/index.html'));
});

module.exports = app;
