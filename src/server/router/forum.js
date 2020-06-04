const express = require('express');
const api = require('../api/forum');
const verifyToken = require('./verifyToken');

const router = express.Router();
//  Forum
router.get('/api/forum/posts', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  api.listPosts().then((rows) => {
    res.json(rows);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.get('/api/forum/posts/:category', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  const { category } = req.params;
  api.listPostsFromCategory(category).then((rows) => {
    res.json(rows);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.get('/api/forum/post/:id', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.json({ post: 'request for specific post - to display on its own page' });
});

router.get('/api/forum/post/comments/:postID', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  const { postID } = req.params;
  api.getComments(postID).then((rows) => {
    res.json(rows);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.post('/api/forum/create/post', verifyToken, (req, res) => {
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

router.post('/api/forum/create/comment', verifyToken, (req, res) => {
  const comment = {
    body: req.body.body,
    date: req.body.date,
    author: req.body.author,
    linkedPost: req.body.linkedPost,
  };
  api.createComment(comment);
  res.json(comment);
});

router.get('/api/forum/author/:authorID', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  const { authorID } = req.params;
  api.getAuthor(authorID).then((rows) => {
    res.json(rows);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.post('/api/forum/delete/post', verifyToken, (req, res) => {
  const postID = { id: req.body.id };
  api.deletePost(postID);
  res.json(postID);
});

router.post('/api/forum/delete/comment', verifyToken, (req, res) => {
  const commentID = { id: req.body.id };
  api.deleteComment(commentID);
  res.json(commentID);
});

module.exports = router;
