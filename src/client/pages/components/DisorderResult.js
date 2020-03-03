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
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div className="disorder-result">
        <h3 className="disorder-title" onClick={this.handleOpenModal}>{this.props.title}</h3>
        <p className="disorder-subtitle" onClick={this.handleOpenModal}>{this.props.subtitle}</p>
        <p className="disorder-content">{this.props.content}</p>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Modal"
          onRequestClose={this.handleCloseModal}
          className="disorder-modal"
        >
          <div className="disorder-detailed">
            <button className="close" onClick={this.handleCloseModal}>X</button>
            <h3 className="disorder-title">{this.props.title}</h3>
            <h3 className="disorder-subtitle">{this.props.subtitle}</h3>
            <h3 className="disorder-content">{this.props.content}</h3>
            <h4 className="disorder-section-header">Section Header 1</h4>
            <text className="disorder-section-content">{this.props.detailedContent}</text>
            <h4 className="disorder-section-header">Section Header 2</h4>
            <text className="disorder-section-content">{this.props.detailedContent}</text>
            <h4 className="disorder-section-header">Section Header 3</h4>
            <text className="disorder-section-content">{this.props.detailedContent}</text>
          </div>
        </ReactModal>
      </div>
    );
  }
}
