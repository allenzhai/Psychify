const mysql = require('mysql');

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    });
  }

  connect() {
    console.log("Connection database...");
    this.connection.connect((err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Connected!");
    });
  }

  query(statment) {
    return new Promise((resolve, reject) => {
      this.connection.query(statment, (err, rows) => {
        if (err) {
          return reject(err);
        }
        console.log('Succeeded');
        console.log(rows);
        resolve(rows);
      });
    });
  }

  close() {
    this.connection.end((err) => {
      console.log("Disconnected!");
    });
  }
}

module.exports = Database;
