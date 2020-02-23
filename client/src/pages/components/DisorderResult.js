import React, {Component} from 'react';
import './style/DisorderResult.css';

export class DisorderResult extends React.Component {

    render() {
      return (
        <div className="disorder-result">
          <h3 className="disorder-title">{this.props.title}</h3>
          <p className="disorder-subtitle">{this.props.subtitle}</p>
          <p className="disorder-content">{this.props.content}</p>
        </div>
      );
    }
}