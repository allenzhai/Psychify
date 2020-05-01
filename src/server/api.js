const pool = require('./database');

exports.listDisorders = () => {
  const stm = 'SELECT * FROM Disorders';
  return pool.query(stm);
};

exports.queryName = (disorderName) => {
  const stm = `${'SELECT DISTINCT * FROM Disorders'
    + ' WHERE Name LIKE \'%'}${disorderName}%'`
    + ` OR Alias LIKE '%${disorderName}%'`
    + ` OR Category LIKE '%${disorderName}%'`
    + ` OR Sub_category LIKE '%${disorderName}%'`;
  return pool.query(stm);
};

exports.registerUser = (user) => {
  const stm = `INSERT INTO LoginInfo(user, password, email, type, salt) VALUES("${user.username}", "${user.passwordHash}", "${user.email}", 0, "${user.salt}")`;
  console.log(stm);
  return pool.query(stm);
};

exports.getUser = (username) => {
  const stm = `SELECT * FROM LoginInfo\nWHERE user="${username}"`;
  return pool.query(stm);
};
