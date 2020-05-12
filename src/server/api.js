const pool = require('./database');

exports.listDisorders = () => {
  const stm = 'SELECT * FROM Disorders';
  return pool.query(stm);
};

exports.queryName = (disorderName, sortBy) => {
  const orderBy = sortBy || 'name';
  const stm = `${'SELECT DISTINCT * FROM Disorders'
    + ' WHERE Name LIKE \'%'}${disorderName}%'`
    + ` OR Alias LIKE '%${disorderName}%'`
    + ` OR Category LIKE '%${disorderName}%'`
    + ` OR Sub_category LIKE '%${disorderName}%'`
    + `order by ${orderBy}`;
  return pool.query(stm);
};

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
  const stm = `UPDATE Accounts SET Email="${profile.email}", Username="${profile.username}", About="${profile.about}", FirstName="${profile.name}", Local="${profile.loc}", DOB="${profile.DOB}" WHERE ID = ${profile.ID}`;
  return pool.query(stm);
};

exports.listPosts = () => {
  // Returns all forum posts
  const stm = 'SELECT * FROM ForumPosts ORDER BY Date DESC';
  return pool.query(stm);
};

exports.getComments = (postID) => {
  const stm = `SELECT * FROM ForumComments WHERE Post = ${postID}`;
  return pool.query(stm);
};

exports.createPost = (post) => {
  const stm = `INSERT INTO ForumPosts(Title, Body, Category, Author, Date) VALUES("${post.title}", "${post.body}", "${post.category}", "${post.author}", "${post.date}")`;
  console.log(stm);
  return pool.query(stm);
};

exports.createComment = (comment) => {
  const stm = `INSERT INTO ForumComments(Body, Author, Date, Post) VALUES("${comment.body}", "${comment.author}", "${comment.date}", "${comment.linkedPost}")`;
  console.log(stm);
  return pool.query(stm);
};
