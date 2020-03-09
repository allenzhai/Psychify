import React, {Component} from 'react';
import {Navbar} from './components/Navbar.js';

import { ResultsSearchbar } from './components/ResultsSearchbar.js';

import { DisorderResult } from './components/DisorderResult';
import './components/style/SearchResults.css';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');
export class SearchResults extends React.Component {
  
  handleSearchbarUpdate(searchterms) {
    this.setState({searchterms});
  }

  handleSearchbarSubmit(searchterms) {
    fetch("http://localhost:5000/api/disorders")
    //fetch("http://localhost:5000/api/searchDisorderName/int")
      .then(res => res.json())
      .then(
        (serverResult) => {
          console.log(JSON.stringify(serverResult));
          this.setState({
            isLoaded: true,
            resultsList: serverResult,
          })
        }
      );
  }
  
  constructor(props){
    super(props);
    this.handleSearchbarUpdate = this.handleSearchbarUpdate.bind(this);
    this.handleSearchbarSubmit = this.handleSearchbarSubmit.bind(this);
    this.state = {
      searchterms: '',
      resultsList: [],
      isLoaded: false,
    };

    /*fetch("http://localhost:5000/api/disorders")
    //fetch("http://localhost:5000/api/searchDisorderName/int")
      .then(res => res.json())
      .then(
        (serverResult) => {
          console.log(JSON.stringify(serverResult));
          this.setState({
            isLoaded: true,
            resultsList: serverResult,
          })
        }
      );*/
  }




  render() {
    const searchterms = this.state.searchterms;
    return (
      <div className="results">
        <Navbar />
        <div className="search-results-container">
          <h2 className="search-results-title">Search Results</h2>
          <ResultsSearchbar 
            className="search-bar"
            searchterms = {searchterms}
            onSearchbarUpdate={this.handleSearchbarUpdate}
            onSearchbarSubmit={this.handleSearchbarSubmit}/>
          {/* <h2 className = "example"> example: {JSON.stringify(this.state.example)} </h2> */}
          <div className="results-entries">
            {this.state.isLoaded ?
             this.state.resultsList.length ? 
             this.state.resultsList.map((entry) => <DisorderResult className="disorder-result" 
              title={entry.name} 
              category={entry.category} 
              subCategory={entry.sub_category} 
              diagnosticCriteria={entry.diagnostic_criteria}
              description={entry.description}/>)
              : <h2 className="no-results">No results</h2>
              : <p>{/*Fancy loading animation*/}</p>}
          </div>
        </div>
      </div>
    );
  }
}
