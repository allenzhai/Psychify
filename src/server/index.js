const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'l',
  user: 'u',
  password: 'p',
  database: 'db'
})

connection.connect()

const app = express();

app.use(express.static('dist'));
// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'dist/index.html'));
});

app.get('/api/disorders', (req, res) =>{
  res.send(connection.query('SELECT * FROM dsm'), function(err, rows, fields) {
    if (err) throw err

    console.log('Disorder 1: ', rows[0].name)
    );
  })
})

connection.end()

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
