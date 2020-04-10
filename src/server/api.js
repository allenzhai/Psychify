const pool = require('./database');

exports.listDisorders = function () {
  const stm = 'SELECT * FROM Disorders';
  return pool.query(stm);
}

exports.queryName = function (disorderName) {
  const stm = 'SELECT * FROM Disorders WHERE Name LIKE  \'' + disorderName + '%\' ';
  return pool.query(stm);
}
