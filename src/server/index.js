const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('dist'));
// Handles any requests that don't match the ones above
app.get('', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist/index.html'));
});

app.get('/api/disorders', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.json([{ name: "Intelligence Disorder" ,
    alias: "Intellectual Developmental Disorder",
    category: "Neurodevelopmental Disorders",
    sub_category: "Intellectual Disabilities",
    diagnostic_criteria: "A: Lorem ipsum dolem...",
    description: "Intellectual disability is a disorder..."},
    {name: "Language Disorder",
    alias: "Language Disorder",
    category: "Neurodevelopmental Disorders",
    sub_category: "Communication Disorders",
    diagnostic_criteria: "A. Persistent Difficulties",
    description: "The core diagnostic features of language..."}]
  );
});


const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
