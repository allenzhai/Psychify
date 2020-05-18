/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import useAge from '../hooks/useAge';

function ForumComment(props) {
  const { body, author, date } = props;

  return (
    <div className="comment">
      <p className="comment-text">{body}</p>
      <p className="comment-information">{`${author}   |   ${useAge(date)}`}</p>
    </div>
  );
}

ForumComment.propTypes = {
  body: PropTypes.string.isRequired,
  author: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
};

export default ForumComment;
