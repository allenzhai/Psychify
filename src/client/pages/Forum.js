import React, { useState } from 'react';
import ReactModal from 'react-modal';
import Navbar from '../components/Navbar';
import ForumPost from '../components/ForumPost';

import '../style/Forum.css';

function Forum() {
  const [showModal, setShowModal] = useState(false);
  const [posts] = useState([{
    title: 'Lorem ispsum this is a post title',
    author: 'username',
    age: '20h',
    category: 'Anxiety',
    likes: '1'
  },
  {
    title: 'Lorem ispsum this is a post title',
    author: 'username',
    age: '20h',
    category: 'Anxiety',
    likes: '1'
  },
  {
    title: 'Lorem ispsum this is a post title',
    author: 'username',
    age: '20h',
    category: 'Anxiety',
    likes: '1'
  },
  {
    title: 'Lorem ispsum this is a post title',
    author: 'username',
    age: '20h',
    category: 'Anxiety',
    likes: '1'
  },
  {
    title: 'Lorem ispsum this is a post title',
    author: 'username',
    age: '20h',
    category: 'Anxiety',
    likes: '1'
  },
  {
    title: 'Lorem ispsum this is a post title',
    author: 'username',
    age: '20h',
    category: 'Anxiety',
    likes: '1'
  },
  {
    title: 'Lorem ispsum this is a post title',
    author: 'username',
    age: '20h',
    category: 'Anxiety',
    likes: '1'
  },
  {
    title: 'Lorem ispsum this is a post title',
    author: 'username',
    age: '20h',
    category: 'Anxiety',
    likes: '1'
  },
  {
    title: 'Lorem ispsum this is a post title',
    author: 'username',
    age: '20h',
    category: 'Anxiety',
    likes: '1'
  }]);

  function handleCreatePostClick() {
    if (!showModal) setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    document.body.style.overflowY = 'unset';
  }

  return (
    <div>
      <Navbar />
      <div className="forum-content">
        <div className="forum-header">
          <h1 className="forum-title">Forum</h1>
          <button className="create-post-button" type="button" onClick={handleCreatePostClick}>
            Create Post
          </button>
        </div>
        <div className="forum-posts-container">
          {posts.map((e, i) => {
            let post = (
              <ForumPost
                className="post"
                title={e.title}
                author={e.author}
                age={e.age}
                category={e.category}
                likes={e.likes}
              />
            );
            // Displays dividing line after post if not the last post
            if (i < posts.length - 1) {
              post = (
                <div>
                  {post}
                  <hr />
                </div>
              );
            }
            return post;
          })}
        </div>
        <i className="fas fa-stop" />
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
            <h3 className="post-title-modal">Create New Post</h3>
          </div>
          <p className="post-information-modal">Share something with the community</p>
        </div>
        <div className="new-post">
          <p className="new-post-text">Title</p>
          <textarea className="new-post-field title" rows="1" placeholder="Enter a descriptive title" />
          <p className="new-post-text">Body</p>
          <textarea className="new-post-field body" rows="10" placeholder="(Optional) Enter post body" />
          <p className="new-post-text">Category</p>
          <textarea className="new-post-field category" rows="1" placeholder="Select a category that fits your post" />
          <button className="new-post-submit" type="submit">Post</button>
        </div>
      </ReactModal>
    </div>
  );
}

export default Forum;
