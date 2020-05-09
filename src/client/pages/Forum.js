import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import ForumPost from '../components/ForumPost';

import '../style/Forum.css';

function Forum() {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState();
  const [newPostBody, setNewPostBody] = useState();
  const [newPostCategory, setNewPostCategory] = useState();

  function handleCreatePostClick() {
    if (!showModal) setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    document.body.style.overflowY = 'unset';
  }

  function handleNewPostTitleChange(event) {
    setNewPostTitle(event.target.value);
  }

  function handleNewPostBodyChange(event) {
    setNewPostBody(event.target.value);
  }

  function handleNewPostCategoryChange(event) {
    setNewPostCategory(event.target.value);
  }

  function queryPosts() {
    fetch('/api/forum/posts')
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(res => res.json())
      .then(
        (serverResult) => {
          setPosts(serverResult);
          setLoaded(true);
        }
      )
      .catch(() => {
        console.log('Post query failed');
      });
  }

  function handlePostSubmit() {
    const request = {
      method: 'POST',
      mode: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: {
        title: newPostTitle,
        body: newPostBody,
        category: newPostCategory
      }
    };
    setNewPostTitle('');
    setNewPostBody('');
    setNewPostCategory('');
    fetch('/api/forum/create/post', request)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(() => {
        console.log('Post successful');
      })
      .catch(() => {
        console.log('Post failed');
      });
    setShowModal(false);
  }

  useEffect(() => {
    if (!isLoaded) {
      queryPosts();
    }
  });

  return (
    <div>
      <div className="forum-content">
        <div className="forum-header">
          <h1 className="forum-title">Forum</h1>
          <button className="create-post-button" type="button" onClick={handleCreatePostClick}>
            Create Post
          </button>
        </div>
        <div className="forum-posts-container">
          {isLoaded ? posts.map((e, i) => {
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
          }) : <div className="loading-icon"><i className="fa fa-circle-notch" /></div>}
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
          <textarea className="new-post-field title" rows="1" placeholder="Enter a descriptive title" value={newPostTitle} onChange={handleNewPostTitleChange} />
          <p className="new-post-text">Body</p>
          <textarea className="new-post-field body" rows="10" placeholder="(Optional) Enter post body" value={newPostBody} onChange={handleNewPostBodyChange} />
          <p className="new-post-text">Category</p>
          <textarea className="new-post-field category" rows="1" placeholder="Select a category that fits your post" value={newPostCategory} onChange={handleNewPostCategoryChange} />
          <button className="new-post-submit" type="submit" onClick={handlePostSubmit}>Post</button>
        </div>
      </ReactModal>
    </div>
  );
}

export default Forum;
