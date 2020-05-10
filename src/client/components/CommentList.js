import React from 'react';
import PropTypes from 'prop-types';

import DisorderResult from './DisorderResult';

function CommentList({ datasource }) {
  console.log(datasource);
  const dataset = datasource;

  const uiList = (
    <div className="post-comments">
      {dataset.map((e, i) => {
        let comment = (
          <div className="comment">
            <p className="comment-text">{e.Body}</p>
            <p className="comment-information">{`${e.Author}   |   ${e.Date}`}</p>
          </div>
        );
        // Displays dividing line after post if not the last comment
        if (i < dataset.length - 1) {
          comment = (
            <div>
              {comment}
              <hr />
            </div>
          );
        }
        return comment;
      })}
    </div>
  );

  if (dataset.length === 0) {
    return (<p className="no-comments">No comments</p>);
  }

  return (
    <div className="comments-list">
      {uiList}
    </div>
  );
}

CommentList.propTypes = {
  datasource: PropTypes.arrayOf(PropTypes.shape({
    body: PropTypes.string.isRequired,
    author: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
  })).isRequired
};

export default CommentList;
