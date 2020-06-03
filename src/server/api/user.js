const pool = require('../database');

exports.registerUser = (user) => {
  let stm = `INSERT INTO Accounts(Username, Email) VALUES("${user.username}", "${user.email}")`;
  pool.query(stm, () => {
    stm = `SELECT ID FROM Accounts\nWHERE Username="${user.username}"`;
    pool.query(stm, (err, rows) => {
      if (err) throw err;
      console.log(rows);
      stm = `INSERT INTO LoginInfo(id, user, password, email, type, salt) VALUES(${rows[0].ID}, "${user.username}", "${user.passwordHash}", "${user.email}", 0, "${user.salt}")`;
      console.log(stm);
      return pool.query(stm);
    });
  });
};

exports.getUser = (username) => {
  const stm = `SELECT * FROM LoginInfo\nWHERE user="${username}"`;
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
               WHERE ID ="${profile.ID}"`;
  return pool.query(stm);
};
