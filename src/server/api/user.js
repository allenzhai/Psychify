const pool = require('../database');
const hash = require('../hash');

exports.registerUser = (username, email, password) => {
  const salt = hash.generateSalt();
  const pass = hash.passwordHash(password + process.env.STATIC_SALT + salt);
  const stm = `INSERT INTO Accounts(username, email, pass, type, salt) VALUES("${username}", "${email}", "${pass}", 0, "${salt}")`;
  return pool.query(stm);
};

exports.getUser = (username) => {
  const stm = `SELECT id, username, pass, email, salt, type FROM Accounts WHERE Username="${username}"`;
  return pool.query(stm);
};

exports.getProfile = (ID) => {
  const stm = `SELECT * FROM Accounts WHERE ID = ${ID}`;
  return pool.query(stm);
};

exports.updateProfile = (profile) => {
  const stm = `UPDATE Accounts SET Email="${profile.email}",
               Username="${profile.username}",
               About="${profile.about}",
               FirstName="${profile.name}",
               DOB="${profile.DOB}"
               WHERE ID ="${profile.id}"`;
  return pool.query(stm);
};
