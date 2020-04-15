import React, {Component} from 'react';
import './style/Searchbar.css';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory({
  forceRefresh: true
});

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
    event.preventDefault();
    history.push({
      pathname: '/results',
      search: '?terms=' + this.state.searchTerms.split(' '),
    });
  }

  handleChange(event){
    //Called every time the searchbar text changes
    this.setState({searchTerms: event.target.value});
  }

  render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit} >
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