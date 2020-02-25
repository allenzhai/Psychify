import React, {Component} from 'react';
import './style/DisorderResult.css';
import ReactModal from 'react-modal';

export class DisorderResult extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false
    };
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
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
            >
              <div className="disorder-detailed">
                <h3 className="disorder-title">{this.props.title}</h3>
                <h3 className="disorder-subtitle">{this.props.subtitle}</h3>
                <text className="disorder-detailedContent">{this.props.detailedContent}</text>
                <br/>
                <br/>
                <button onClick={this.handleCloseModal}>Close Details</button>
              </div>
            </ReactModal>
        </div>
      );
    }
}