import React from 'react';
import Navbar from '../components/Navbar';
import '../style/Forum.css';

export default class Forum extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Navbar />
        <h1 className="forum-title">Forum</h1>
        <div className="forum-posts-container">
          
        </div>
      </div>
    );
  }
}
