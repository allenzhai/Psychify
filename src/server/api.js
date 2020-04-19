const pool = require('./database');

exports.listDisorders = function () {
  const stm = 'SELECT * FROM Disorders';
  return pool.query(stm);
}

exports.queryName = function (disorderName) {
  const stm = 'SELECT DISTINCT * FROM Disorders' +
              ' WHERE Name LIKE \'%' + disorderName + '%\'' +
              ' OR Alias LIKE \'%' + disorderName + '%\''  +
              ' OR Category LIKE \'%' + disorderName + '%\'' +
              ' OR Sub_category LIKE \'%' + disorderName + '%\'';
  return pool.query(stm);
}

exports.registerUser = function (user) {
  const stm = `INSERT INTO Accounts(user, password, email, type, salt) VALUES("${user.username}", "${user.passwordHash}", "${user.email}", 0, "${user.salt}")`;
  return pool.query(stm);
}
