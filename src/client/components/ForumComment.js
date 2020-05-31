/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import useAge from '../hooks/useAge';

import useFetch from '../hooks/useFetch';


function ForumComment(props) {
  const { body, author, date } = props;

  const endPointAuthor = `/api/forum/author/${author}`;
  const [dataAuthor] = useFetch(endPointAuthor);

  const username = () => {
    if (author !== 0 && dataAuthor !== undefined && dataAuthor.length) {
      return dataAuthor[0].Username;
    }
    return '[unknown]';
  };

  return (
    <div className="comment">
      <p className="comment-text">{body}</p>
      <p className="comment-information">{`${username()}   |   ${useAge(date)}`}</p>
    </div>
  );
}

ForumComment.propTypes = {
  body: PropTypes.string.isRequired,
  author: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
};

export default ForumComment;
