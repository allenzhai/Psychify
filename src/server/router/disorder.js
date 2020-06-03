const express = require('express');
const api = require('../api/disorder');

const router = express.Router();

router.get('/api/disorder/search', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  const { terms, sortBy } = req.query;

  api.queryName(terms, sortBy).then((rows) => {
    res.json(rows);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.get('/api/disorder/names', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  api.getDisorderNames().then((rows) => {
    res.json(rows);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

module.exports = router;
