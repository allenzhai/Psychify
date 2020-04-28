const express = require('express');
const path = require('path');
const api = require('./api');

const app = express();

app.use(express.static('dist'));
// Handles any requests that don't match the ones above

app.get('/api/disorders', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
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
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  const { disorder } = req.params;

  api.queryName(disorder).then((rows) => {
    res.json(rows);
  }).catch((err) => {
    console.log(err);
    // should return user friendly error message here.
    // future change is needed here;
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
