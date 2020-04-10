import React, {Component} from 'react';
import './style/ResultsSearchbar.css';

export class ResultsSearchbar extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //this.state = {
    //  searchTerms: '',
    };

  handleSubmit(event){
    //Called when you hit 'enter' in the searchbar
    this.props.onSearchbarSubmit(event.target.value);
    event.preventDefault();
  }

  handleChange(event){
    //Called every time the searchbar text changes
    //this.setState({searchTerms: event.target.value});
    this.props.onSearchbarUpdate(event.target.value);
  }

  render() {
    const searchterms = this.props.searchterms;
      return (
        <div className="results-search-parent">
          <form onSubmit={this.handleSubmit} >
            <input 
              type="text" 
              className="results-search" 
              placeholder="Enter Symptoms e.g. 'Trouble Sleeping'" 
              autoComplete="off"
              value={searchterms}
              onChange={this.handleChange}/>
          </form>
        </div>
      );
    }
}