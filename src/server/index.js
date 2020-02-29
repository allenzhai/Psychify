const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('dist'));
// Handles any requests that don't match the ones above
app.get('/*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist/index.html'));
});

app.get('/api/disorders', (req, res) => {
  res.json({ "name": "Intelligence Disorder" });
});


const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
