/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import useAge from '../hooks/useAge';

import useFetch from '../hooks/useFetch';
import UserContext from '../context/UserContext';



function ForumComment(props) {
  const { body, author, date, commentID } = props;

  const userContext = useContext(UserContext);
  const { token, ID } = userContext;

  const [confirmCommentDelete, setConfirmCommentDelete] = useState(false);

  const endPointAuthor = `/api/forum/author/${author}`;
  const [isLoadingAuthor, dataAuthor, errorAuthor] = useFetch(endPointAuthor);


  function handleDeleteCommentClick() {
    if (confirmCommentDelete) {
      const commentToDelete = {
        id: commentID
      };
      const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(commentToDelete),
      };
      fetch('/api/forum/delete/comment', request)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response;
        })
        .then(() => {
          console.log('Comment delete successful');
          window.location.reload(false);
        })
        .catch(() => {
          console.log('Comment Delete failed');
        });
    } else {
      setConfirmCommentDelete(true);
    }
  }

  const showDeleteButton = () => {
    console.log('delete id: ' + commentID);
    if (ID === author || (author === 0 && ID === undefined)) {
      let deleteText = 'delete';
      if (confirmCommentDelete) {
        deleteText = 'confirm delete';
      }
      return <p className="comment-information delete" onClick={handleDeleteCommentClick}>{deleteText}</p>;
    }
    return null;
  };

  const username = () => {
    if (author === 0) {
      return '[no linked user]';
    }
    if (dataAuthor !== undefined && dataAuthor.length) {
      return dataAuthor[0].Username;
    }
    return '[unknown]';
  };

  return (
    <div className="comment">
      <p className="comment-text">{body}</p>
      <div className="comment-information-container">
        <p className="comment-information">{`${username()}   |   ${useAge(date)}`}</p>
        {showDeleteButton()}
      </div>
    </div>
  );
}

ForumComment.propTypes = {
  body: PropTypes.string.isRequired,
  author: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  commentID: PropTypes.number.isRequired,
};

export default ForumComment;
