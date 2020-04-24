import React from 'react';
import PropTypes from 'prop-types';

import '../style/ForumPost.css';

function ForumPost(props) {
  const {
    title, author, age, category
  } = props;

  return (
    <div className="forum-post">
      <div className="line-1">
        <h1 className="post-title">{title}</h1>
        <p className="post-category">{category}</p>
      </div>
      <p className="post-information">{`${author}  | ${age}`}</p>
    </div>
  );
}

ForumPost.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired
};


export default ForumPost;
