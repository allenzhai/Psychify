const pool = require('../database');

exports.listPosts = () => {
  // Returns all forum posts
  const stm = 'SELECT * FROM ForumPosts ORDER BY Date DESC';
  return pool.query(stm);
};

exports.listPostsFromCategory = (Category) => {
  // Returns all forum posts
  console.log(Category);
  const stm = `SELECT * FROM ForumPosts WHERE Category LIKE "%${Category}%" ORDER BY Date DESC`;
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

exports.getDisorderNames = () => {
  const stm = 'SELECT * FROM DisorderNames';
  return pool.query(stm);
};
