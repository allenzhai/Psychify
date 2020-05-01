/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import Button from './Button';

import '../style/DisorderResult.css';

ReactModal.setAppElement('#root');

function DisorderResult({ result }) {
  const [showModal, setShowModal] = useState(false);

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

  const {
    name, category, description
  } = result;

  return (
    <div className="disorder-result" onClick={handleOpenModal}>
      <h3 className="disorder-title" onClick={handleOpenModal}>{name}</h3>
      <p className="disorder-category" onClick={handleOpenModal}>{category}</p>
      <p className="disorder-sub-category">{result.sub_category}</p>
      <ReactModal
        isOpen={showModal}
        contentLabel="onRequestClose Modal"
        onRequestClose={handleCloseModal}
        className="disorder-modal"
      >
        <div className="disorder-detailed">
          <Button className="close" onClick={handleCloseModal}>X</Button>
          <div className="modal-header">
            <h3 className="disorder-title-modal">{name}</h3>
            <p className="disorder-category-modal">{category}</p>
            <p className="disorder-sub-category-modal">{result.sub_category}</p>
          </div>
          <div className="modal-body">
            <h3 className="disorder-section-header">Diagnostic Criteria</h3>
            <p className="disorder-diagnostic-criteria">{result.diagnostic_criteria}</p>
            <h3 className="disorder-section-header">Diagnostic Features</h3>
            <p className="disorder-description">{description}</p>
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
