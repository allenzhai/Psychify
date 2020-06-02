/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../style/DisorderResult.css';
import ReactModal from 'react-modal';

import Button from './Button';

ReactModal.setAppElement('#root');

function DisorderResult({ result }) {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const {
    name, category, description, sub_category, diagnostic_criteria
  } = result;

  const handleOpenModal = () => {
    if (!showModal) {
      setShowModal(true);
    }
    // document.body.style.overflowY = 'hidden';
  };

  const handleCloseModal = () => {
    setShowModal(false);
    document.body.style.overflowY = 'unset';
  };

  const handleForumLinkClick = () => {
    history.push({
      pathname: '/forum',
      search: `?category=${name}`,
    });
  }

  return (
    <div className="disorder-result">
      <div className="disorder-header">
        <h3 className="disorder-title" onClick={handleOpenModal}>{name}</h3>
        <button className="forum-link" type="button" onClick={handleForumLinkClick}>Discussion</button>
      </div>
      <p className="disorder-category" onClick={handleOpenModal}>{category}</p>
      <p className="disorder-sub-category" onClick={handleOpenModal}>{sub_category}</p>
      <ReactModal
        isOpen={showModal}
        contentLabel="onRequestClose Modal"
        onRequestClose={handleCloseModal}
        className="disorder-modal"
      >
        <div className="disorder-detailed">
          <div className="close"><i className="fas fa-times" onClick={handleCloseModal} /></div>

          <div className="modal-header">
            <h3 className="disorder-title-modal">{name}</h3>
            <p className="disorder-category-modal">{category}</p>
            <p className="disorder-sub-category-modal">{sub_category}</p>
          </div>
          <div className="modal-body">
            <h3 className="disorder-section-header">Diagnostic Criteria</h3>
            <p className="disorder-diagnostic-criteria">{diagnostic_criteria}</p>
            <h3 className="disorder-section-header">Diagnostic Features</h3>
            <p className="disorder-description">{description}</p>
            <Link
              to={{
                pathname: '/disorderPage',
                data: result
              }}
            >
              more
            </Link>
          </div>
        </div>
      </ReactModal>
    </div>
  );
}

DisorderResult.propTypes = {
        result: PropTypes.shape({
        name: PropTypes.string.isRequired,
    category: PropTypes.string,
    sub_category: PropTypes.string,
    diagnostic_criteria: PropTypes.string,
    description: PropTypes.string.isRequired
  }).isRequired
};

export default DisorderResult;
