import React, {Component} from 'react';
import './style/DisorderDetails.css';

export class DisorderDetails extends React.Component {

    render() {
      return (
        <div className="disorder-details">
          <h1 className="disorder-title">{this.props.title}</h1>
          <h2 className="disorder-subtitle">{this.props.subtitle}</h2>
          <p className="disorder-content">{this.props.content}</p>
        </div>
      );
    }
}