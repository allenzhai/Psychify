/* This script takes an input CSV file ("csvTable.csv" by default)
 * and imports it into the database asynchronously.
 * This can be used to automatically update the database with
 * new entries as we add more of them into the project.
 */

var fs = require('fs');
var mysql = require('mysql');
var fastcsv = require('fast-csv');

// Create the connection to be used
var cnxn = mysql.createConnection({
  host: "database-1.cfwynfjcelo6.us-east-1.rds.amazonaws.com",
  user: "gaprogg",
  password: "nTxenFjsHbko44X0",
  database: "dsm"
});

// This set's the data source for our stream
let stream = fs.createReadStream("csvTable.csv");
// empty array to put entries into
let csvData = [];
// This defines the behavior of the fast-csv stream
let csvStream = fastcsv
  .parse()
  // There are 2 listens here
  // "data" triggers on a successful read from the csv
  .on("data", function(data) {
    csvData.push(data);
  })
  // "end" triggers at the end of the csv,
  // or after the last useable entry is pushed
  .on("end", function() {
    // Skip first line of input (this *should* be headers)
    csvData.shift();
    
    // Connect to database
    cnxn.connect(function(err) {
      if (err) {
        cnxn.end();
        throw err;
      } else {
        console.log("Connected, writing values:");
        
        // Create mySQL syntax for write operation
        let query = 
          "INSERT INTO Disorders (id, name, alias, category, sub_category, diagnostic_criteria, description) VALUES ?";
        
        // Write each entry into database
        cnxn.query(query, [csvData], (error, response) => {
          console.log(error || response);
        });
      }
    });
  });

// run fast-csv's stream on imput file
stream.pipe(csvStream);