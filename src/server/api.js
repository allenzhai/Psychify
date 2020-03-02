const Database = require('./db');

const db = new Database();
db.connect();

exports.listDisorders = function () {
  const stm = 'SELECT * FROM Disorders';
  return db.query(stm);
}
