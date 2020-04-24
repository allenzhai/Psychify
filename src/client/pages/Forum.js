import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ForumPost from '../components/ForumPost';
import '../style/Forum.css';

function Forum() {
  const [posts] = useState([{
    title: 'Lorem ispsum this is a post title',
    author: 'username',
    age: '20h',
    category: 'Anxiety'
  },
  {
    title: 'Lorem ispsum this is a post title',
    author: 'username',
    age: '20h',
    category: 'Anxiety'
  },
  {
    title: 'Lorem ispsum this is a post title',
    author: 'username',
    age: '20h',
    category: 'Anxiety'
  }]);

  return (
    <div>
      <Navbar />
      <div className="forum-content">
        <h1 className="forum-title">Forum</h1>
        <div className="forum-posts-container">
          {posts.map((e, i) => {
            let post = (
              <ForumPost
                title={e.title}
                author={e.author}
                age={e.age}
                category={e.category}
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
      </div>
    </div>
  );
}

export default Forum;
