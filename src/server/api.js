const Database = require('./db');

const db = new Database();
db.connect();

exports.listDisorders = function () {
  const stm = 'SELECT * FROM Disorders';
  return db.query(stm);
}

exports.queryName = function (disorderName) {
    const stm = 'SELECT * FROM Disorders WHERE Name LIKE  \'' + disorderName + '%\' ';
    return db.query(stm);
}
