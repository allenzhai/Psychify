/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import useFetch from '../hooks/useFetch';
import CommentList from './CommentList';

import '../style/ForumPost.css';

function ForumPost(props) {
  const {
    title, author, date, category, likes, postID
  } = props;

  const [showModal, setShowModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [newCommentBody, setNewCommentBody] = useState();

  const endPoint = `/api/forum/post/comments/${postID}`;
  const [isLoading, data, error] = useFetch(endPoint);

  function handleCloseModal() {
    setShowModal(false);
    document.body.style.overflowY = 'unset';
  }

  function handleLike(e) {
    setLiked(!liked);
    e.stopPropogation();
  }

  function handleOpenModal() {
    if (!showModal) setShowModal(true);
  }

  function queryComments() {
    fetch(`/api/forum/post/comments/${postID}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(res => res.json())
      .then(
        (serverResult) => {
          setComments(serverResult);
          setLoaded(true);
        }
      )
      .catch(() => {
        console.log('Comments query failed');
      });
  }

  function handleNewCommentBodyUpdate(event) {
    setNewCommentBody(event.target.value);
  }

  function handleCommentSubmit() {
    const request = {
      method: 'POST',
      mode: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: {
        body: document.getElementById('new-comment-field'),
      }
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
      })
      .catch(() => {
        console.log('Comment failed');
      });
  }

  const comments = data || [];

  return (
    <div className="forum-post">
      <div className="line-1">
        <div className="title">
          <href className="post-title" onClick={handleOpenModal} role="button" tabIndex="-1">{title}</href>
          <p className="post-category">{category}</p>
        </div>
        <div className="likes">
          {liked
            ? <i className="fas fa-heart" onClick={handleLike} role="button" tabIndex="-1" />
            : <i className="far fa-heart" onClick={handleLike} role="button" tabIndex="-1" />}
          <p className="likes-number">{likes}</p>
        </div>
      </div>
      <p className="post-information">{`${author}   |   ${date}`}</p>
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
            <p className="post-category">{category}</p>
          </div>
          <p className="post-information-modal">{`${author}   |   ${date}`}</p>
        </div>
        <CommentList datasource={comments} />
        <div className="new-comment">
          <textarea className="new-comment-field" rows="5" placeholder="Add to the discussion!" value={newCommentBody} onChange={handleNewCommentBodyUpdate} />
          <button className="new-comment-submit" type="submit" onClick={handleCommentSubmit}>Comment</button>
        </div>
      </ReactModal>
    </div>
  );
}

ForumPost.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  postID: PropTypes.number.isRequired
};


export default ForumPost;
