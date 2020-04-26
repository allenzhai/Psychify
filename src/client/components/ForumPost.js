/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';


import '../style/ForumPost.css';

function ForumPost(props) {
  const {
    title, author, age, category,
  } = props;

  const [showModal, setShowModal] = useState(false);
  const [liked, setLiked] = useState(false);

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

  return (
    <div className="forum-post">
      <div className="line-1">
        <h1 className="post-title" onClick={handleOpenModal} role="button" tabIndex="-1">{title}</h1>
        <p className="post-category">{category}</p>
        {/* button onclick event bubbles up, need to fix */}
        <div className="likes">
          {liked
            ? <i className="fas fa-heart" onClick={handleLike} role="button" tabIndex="-1" />
            : <i className="far fa-heart" onClick={handleLike} role="button" tabIndex="-1" />}
          {/* <p>{likes}</p> */}
        </div>
      </div>
      <p className="post-information">{`${author}   |   ${age}`}</p>
      <ReactModal
        isOpen={showModal}
        contentLabel="onRequestClose Modal"
        onRequestClose={handleCloseModal}
        className="post-modal"
      >
        <button className="close" onClick={handleCloseModal}>X</button>
        <div className="modal-header">
          <div className="line-1-modal">
            <h3 className="post-title-modal">{title}</h3>
            <p className="post-category">{category}</p>
          </div>
          <p className="post-information-modal">{`${author}   |   ${age}`}</p>
        </div>
        <div className="post-comments">
        </div>
      </ReactModal>
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
