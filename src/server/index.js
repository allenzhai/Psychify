require('dotenv').config();

const express = require('express');
const path = require('path');
const Database = require('./db');
const db = new Database();
const api = require('./api');

const app = express();

app.use(express.static('dist'));
// Handles any requests that don't match the ones above
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist/index.html'));
});

app.get('/api/disorders', (req, res) => {
  api.listDisorders().then(rows => {
    console.log(rows);
    res.json(rows);
  }).catch(err => {
    console.log(err);
    // should return user friendly error message here.
    // future change is needed here;
    res.json(err);
  });

});

app.get('/api/searchDisorderName/:disorder', (req, res) => {
    var disorder = req.params.disorder;

  api.queryName(disorder).then(rows => {
    console.log(rows);
    res.json(rows);
  }).catch(err => {
    console.log(err);
    // should return user friendly error message here.
    // future change is needed here;
    res.json(err);
  });

});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
