/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { createBrowserHistory } from 'history';

import useFetch from '../hooks/useFetch';
import useAge from '../hooks/useAge';
import CommentList from './CommentList';

import '../style/ForumPost.css';

function ForumPost(props) {
  const {
    title, body, author, date, category, likes, postID
  } = props;

  const history = createBrowserHistory({
    forceRefresh: false,
  });
  const params = new URLSearchParams(history.location.search);

  const [showModal, setShowModal] = useState(params.get('post') === String(postID));
  const [liked, setLiked] = useState(false);
  const [newCommentBody, setNewCommentBody] = useState();

  const endPoint = `/api/forum/post/comments/${postID}`;
  const [isLoading, data, error] = useFetch(endPoint);

  const dateString = useAge(date);
  const bodyText = body.length > 0 && body !== 'undefined' ? <p className="post-body">{body}</p> : null;

  const comments = data || [];

  function handleCloseModal() {
    setShowModal(false);
    document.body.style.overflowY = 'unset';
    history.push();
  }

  function handleLike(e) {
    setLiked(!liked);
    e.stopPropogation();
  }

  function handleOpenModal() {
    if (!showModal) setShowModal(true);
    history.push({
      pathname: '/forum',
      search: `?post=${postID}`,
    });
  }

  function handleNewCommentBodyUpdate(event) {
    setNewCommentBody(event.target.value);
  }

  function handleCommentSubmit() {
    const newPostData = {
      body: newCommentBody,
      date: new Date(Date.now()),
      linkedPost: postID,
    };
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(newPostData),
    };
    setNewCommentBody('');
    fetch('/api/forum/create/comment', request)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(() => {
        console.log('Comment successful');
        window.location.reload(false);
      })
      .catch(() => {
        console.log('Comment failed');
      });
  }

  function handleCategoryClick() {
    history.push({
      pathname: '/forum',
      search: `?category=${category}`,
    });
    window.location.reload(true);
  }

  const categoryFlair = category.length > 0 && category !== 'undefined' ? <p className="post-category" onClick={handleCategoryClick} type="button">{category}</p> : null;


  return (
    <div className="forum-post">
      <div className="line-1">
        <div className="title">
          <p className="post-title" onClick={handleOpenModal} role="button" tabIndex="-1">{title}</p>
          
        </div>
        <div className="likes">
          {liked
            ? <i className="fas fa-heart" onClick={handleLike} role="button" tabIndex="-1" />
            : <i className="far fa-heart" onClick={handleLike} role="button" tabIndex="-1" />}
          <p className="likes-number">{likes}</p>
        </div>
      </div>
      <div className="post-information-container">
        <p className="post-information">{`${author}   |   ${dateString}`}</p>
        {categoryFlair}
      </div>
      <ReactModal
        isOpen={showModal}
        contentLabel="onRequestClose Modal"
        onRequestClose={handleCloseModal}
        className="post-modal"
      >
        <button className="close" onClick={handleCloseModal} type="button">X</button>
        <div className="modal-header">
          <div className="line-1-modal">
            <h3 className="post-title-modal">{title}</h3>
          </div>
          {bodyText}
          <div className="post-information-container">
            <p className="post-information-modal">{`${author}   |   ${dateString}`}</p>
            {categoryFlair}
          </div>
        </div>
        <CommentList datasource={comments} />
        <div className="new-comment">
          <textarea className="new-comment-field" rows="5" placeholder="Add to the discussion!" value={newCommentBody} onChange={handleNewCommentBodyUpdate} />
          <button className="new-comment-submit" type="submit" onClick={handleCommentSubmit} disabled={newCommentBody === undefined || !newCommentBody.length}>Comment</button>
        </div>
      </ReactModal>
    </div>
  );
}

ForumPost.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  postID: PropTypes.number.isRequired
};


export default ForumPost;
