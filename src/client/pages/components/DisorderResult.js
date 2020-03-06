import React, { Component } from 'react';
import './style/DisorderResult.css';
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
    if (!this.state.showModal)
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
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
            <h3 className="disorder-title-modal">{this.props.title}</h3>
            <h3 className="disorder-category">{this.props.category}</h3>
            <h3 className="disorder-sub-category">{this.props.subCategory}</h3>
            <h4 className="disorder-section-header">Diagnostic Criteria</h4>
            <text className="disorder-diagnostic-criteria">{this.props.diagnosticCriteria}</text>
            <h4 className="disorder-section-header">Description</h4>
            <text className="disorder-description">{this.props.description}</text>
          </div>
        </ReactModal>
      </div>
    );
  }
}
