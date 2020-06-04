/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useContext } from 'react';
import ReactModal from 'react-modal';
import { createBrowserHistory } from 'history';

import useFetch from '../hooks/useFetch';
import ForumPost from '../components/ForumPost';
import UserContext from '../context/UserContext';

import '../style/Forum.css';

function Forum() {

  const userContext = useContext(UserContext);
  const { user, id } = userContext;
  const defaultCategories = [{ name: 'Other' }];

  const [showModal, setShowModal] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState();
  const [newPostBody, setNewPostBody] = useState();
  const [newPostCategory, setNewPostCategory] = useState(defaultCategories[0].name);

  const history = createBrowserHistory({
    forceRefresh: false,
  });
  const params = new URLSearchParams(history.location.search);
  const [category] = useState(params.get('category') || null);
  const endPoint = category ? `/api/forum/posts/${category}` : 'api/forum/posts/';
  // If a category is set, make category request, otherwise make generic request
  // Hooks must be declared the same way each DOM render which is the reason for this awfulness
  // The useFetch hook call cannot be conditional, but the endPoint parameter can be apparently
  const [isLoading, data, error] = useFetch(endPoint);
  const disorderNamesEndpoint = 'api/disorder/names';
  const [isLoadingNames, dataNames, errorNames] = useFetch(disorderNamesEndpoint);

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

  function handlePostSubmit() {
    const newPostData = {
      author: id,
      title: newPostTitle,
      body: newPostBody,
      category: newPostCategory,
      date: new Date(Date.now()),
    };
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(newPostData),
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
        window.location.reload(true);
      })
      .catch(() => {
        console.log('Post failed');
      });
    setShowModal(false);
  }

  function handleCategoryClearClick() {
    history.push({
      pathname: '/forum',
    });
    window.location.reload(true);
  }

  function displayForumPosts() {
    const posts = data || [];
    if (!isLoading) {
      if (posts.length === 0) {
        return <p className="no-results">Nothing here, add something!</p>
      }
      return (
        <div className="forum-posts-container">
          {posts.map((e, i) => {
            let post = (
              <ForumPost
                className="post"
                title={e.Title}
                body={e.Body}
                author={e.Author}
                date={e.Date}
                category={e.Category}
                likes={e.Likes}
                postID={e.ID}
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
      );
    }
    return <div className="loading-icon"><i className="fa fa-circle-notch" /></div>;
  }

  const posts = data || [];
  const disorderNames = dataNames ? defaultCategories.concat(dataNames) : defaultCategories;
  const categoryHeader = category ? (
    <div className="category-header">
      <i className="fas fa-times-circle" onClick={handleCategoryClearClick}/>
      <p className="category-header-text">{category}</p>
    </div>
  ) : null;

  const createPostButton = () => {
    if (user) {
      return (
        <button className="create-post-button" type="button" onClick={handleCreatePostClick}>
          Create Post
        </button>
      );
    }
    return (
      <p className="create-post-logged-out">Log in or Sign Up to post!</p>
    );
  };

  return (
    <div>
      <div className="forum-content">
        <div className="forum-header">
          <div className="header-text">
            <h1 className="forum-title">Forum</h1>
            {categoryHeader}
          </div>
          {createPostButton()}
        </div>
        {displayForumPosts()}
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
          <select className="new-post-field category" onChange={handleNewPostCategoryChange}>
            {!isLoadingNames ? disorderNames.map((e) => {
              const option = (<option value={e.name}>{e.name}</option>);
              return option;
            })
              : null}
          </select>
          <button className="new-post-submit" type="submit" onClick={handlePostSubmit} disabled={newPostTitle === undefined || !newPostTitle.length}>Post</button>
        </div>
      </ReactModal>
    </div>
  );
}

export default Forum;
