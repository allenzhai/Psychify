import React, {Component} from 'react';
import './style/Searchbar.css';

export class Searchbar extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      searchTerms: '',
    };
  }

  handleSubmit(event){
    //Called when you hit 'enter' in the searchbar
    //alert(this.state.searchTerms);
  }

  handleChange(event){
    //Called every time the searchbar text changes
    this.setState({searchTerms: event.target.value});
  }

  render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit} action="/results">
            <input 
              type="text" 
              className="search" 
              placeholder="Enter Symptoms e.g. 'Trouble Sleeping'" 
              autoComplete="off"
              value={this.state.searchTerms}
              onChange={this.handleChange}/>
          </form>
        </div>
      );
    }
}