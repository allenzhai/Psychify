import React, { Component } from 'react';
import { Navbar } from './components/Navbar.js';

import { ResultsSearchbar } from './components/ResultsSearchbar.js';
import { SortMenu } from './components/SortMenu.js';

import { DisorderResult } from './components/DisorderResult';
import './components/style/SearchResults.css';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');
export class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchbarUpdate = this.handleSearchbarUpdate.bind(this);
    this.handleSearchbarSubmit = this.handleSearchbarSubmit.bind(this);
    this.handleSortUpdate = this.handleSortUpdate.bind(this);
    this.state = {
      searchterms: '',
      resultsList: [],
      isLoaded: false,
      sortByList: [
        {
           key : 0,
           title : 'Name'
        },
        {
            key : 1,
            title : 'Alias'
        },
        {
            key : 2,
            title : 'Sub-Category'
        },
        {
            key : 3,
            title : 'Category'
        }
    ],
    sortBy: 'Name'
    };
  }

  handleSearchbarUpdate(searchterms) {
    this.setState({ searchterms });
  }

  handleSortUpdate(sortBy){
    this.setState({ sortBy });
  }

  handleSearchbarSubmit(searchterms) {
    // alert(this.state.searchterms);
    
    if (!(this.state.searchterms)) {
      fetch('http://localhost:5000/api/disorders')
        .then(res => res.json())
        .then(
          (serverResult) => {
          // console.log(JSON.stringify(serverResult));
            const filteredServerResult = this.filterServerResult(serverResult);
            JSON.stringify();
            this.setState({
              isLoaded: true,
              resultsList: filteredServerResult,
            });
          }
        );
    } else {
      fetch(`http://localhost:5000/api/searchDisorderName/${this.state.searchterms}`)
        .then(res => res.json())
        .then(
          (serverResult) => {
          console.log(JSON.stringify(serverResult));
            const filteredServerResult = this.filterServerResult(serverResult);
            JSON.stringify(filteredServerResult);
            this.setState({
              isLoaded: true,
              resultsList: filteredServerResult,
            });
          }
        );
    }
  }



  filterServerResult(serverResult) {
    const matchArray = [];
    let maxMatch = -1;
    let idx;
    let result;
    const ans = [];
    let A;
    let B;

    serverResult.sort((a, b) => {
      A = a.category.toUpperCase();
      B = b.category.toUpperCase();
      if (this.state.sortBy == "Name"){
          A = a.name.toUpperCase();
          B = b.name.toUpperCase();
      }
      else if (this.state.sortBy == "Alias"){
          A = a.alias.toUpperCase();
          B = b.alias.toUpperCase();
      }
      else if (this.state.sortBy == "Sub-Category") {
          A = a.sub_category.toUpperCase();
          B = b.sub_category.toUpperCase();
      }
      else if (this.state.sortBy == "Category"){
          A = a.category.toUpperCase();
          B = b.category.toUpperCase();
      }

      if (A == ''){
        return 1;
      }
      else if (B == ''){
        return -1;
      }
      else{
        return (A < B) ? -1 : (A > B) ? 1 : 0;
      }
    });

    if (this.state.searchterms != null) {
      for (result = 0; result < serverResult.length; result++) {

        if (this.state.sortBy == "Name"){
            const x = this.MatchCount(serverResult[result].name.split(''));
            matchArray.push(x);
        }
        else if (this.state.sortBy == "Alias"){
            const x = this.MatchCount(serverResult[result].alias.split(''));
            matchArray.push(x);
        }
        else if (this.state.sortBy == "Sub-Category") {
            const x = this.MatchCount(serverResult[result].sub_category.split(''));
            matchArray.push(x);
        }
        else if (this.state.sortBy == "Category"){
            const x = this.MatchCount(serverResult[result].category.split(''));
            matchArray.push(x);
        }
        
      }

      while (ans.length < serverResult.length) {
        maxMatch = -1;
        for (result = 0; result < matchArray.length; result++) {
          if (matchArray[result] > maxMatch) {
            maxMatch = matchArray[result];
            idx = result;
          }
        }
        ans.push(serverResult[idx]);
        matchArray[idx] = -1;
      }
    }
    return ans;
  }

  MatchCount(str) {
    let nameChar;
    let match = 0;
    const search = this.state.searchterms.split('');
    for (nameChar = 0; nameChar < search.length && nameChar < str.length; nameChar++) {
      if (search[nameChar].toUpperCase() == str[nameChar].toUpperCase()) {
        match += 1;
      } else {
        return match;
      }
    }
    return match;
  }

  render() {
    const { searchterms, sortBy } = this.state;

    return (
      <div className="results">
        <Navbar />
        <div className="search-results-container">
          <h2 className="search-results-title">Search Results</h2>
          <SortMenu
            list={this.state.sortByList}
            searchterms={searchterms}
            onSortSubmit={this.handleSearchbarSubmit}
            onSortUpdate = {this.handleSortUpdate}
            sortBy = {sortBy}
          />
          <ResultsSearchbar
            className="search-bar"
            searchterms={searchterms}
            onSearchbarUpdate={this.handleSearchbarUpdate}
            onSearchbarSubmit={this.handleSearchbarSubmit}
          />
          <p className = "sortedBy"> Sorted by {sortBy}</p>

          {/* <h2 className = "example"> example: {JSON.stringify(this.state.example)} </h2> */}
          <div className="results-entries">
            {this.state.isLoaded
              ? this.state.resultsList.length
                ? this.state.resultsList.map(entry => (
                  <DisorderResult
                    className="disorder-result"
                    title={entry.name}
                    category={entry.category}
                    subCategory={entry.sub_category}
                    diagnosticCriteria={entry.diagnostic_criteria}
                    description={entry.description}
                  />
                ))
                : <h2 className="no-results">No results</h2>
              : <p>{/* Fancy loading animation */}</p>}
          </div>
        </div>
      </div>
    );
  }
}
