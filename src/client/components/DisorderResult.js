import React from 'react';
import '../style/DisorderResult.css';
import ReactModal from 'react-modal';

export class DisorderResult extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    if (!this.state.showModal) this.setState({ showModal: true });
    // document.body.style.overflowY = 'hidden';
  }

  handleCloseModal() {
    this.setState({ showModal: false });
    document.body.style.overflowY = 'unset';
  }

  render() {
    return (
      <div className="disorder-result" onClick={this.handleOpenModal}>
        <h3 className="disorder-title" onClick={this.handleOpenModal}>{this.props.title}</h3>
        <p className="disorder-category" onClick={this.handleOpenModal}>{this.props.category}</p>
        <p className="disorder-sub-category">{this.props.subCategory}</p>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Modal"
          onRequestClose={this.handleCloseModal}
          className="disorder-modal"
        >
          <div className="disorder-detailed">
            <button className="close" onClick={this.handleCloseModal}>X</button>
            <div className="modal-header">
              <h3 className="disorder-title-modal">{this.props.title}</h3>
              <p className="disorder-category-modal">{this.props.category}</p>
              <p className="disorder-sub-category-modal">{this.props.subCategory}</p>
            </div>
            <div className="modal-body">
              <h3 className="disorder-section-header">Diagnostic Criteria</h3>
              <p className="disorder-diagnostic-criteria">{this.props.diagnosticCriteria}</p>
              <h3 className="disorder-section-header">Diagnostic Features</h3>
              <p className="disorder-description">{this.props.description}</p>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}
