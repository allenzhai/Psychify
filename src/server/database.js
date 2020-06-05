require('dotenv').config();

const util = require('util');
const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

pool.query = util.promisify(pool.query);
pool.end = util.promisify(pool.end);

module.exports = pool;
