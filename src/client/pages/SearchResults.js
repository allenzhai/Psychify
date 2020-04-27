import React from 'react';
import ReactModal from 'react-modal';
import { createBrowserHistory } from 'history';
import Navbar from '../components/Navbar';
import { ResultsSearchbar } from '../components/ResultsSearchbar';
import SortMenu from '../components/SortMenu';
import { DisorderResult } from '../components/DisorderResult';

import '../style/SearchResults.css';

const history = createBrowserHistory({
  forceRefresh: false
});

ReactModal.setAppElement('#root');

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchbarUpdate = this.handleSearchbarUpdate.bind(this);
    this.handleSearchbarSubmit = this.handleSearchbarSubmit.bind(this);
    this.handleSortUpdate = this.handleSortUpdate.bind(this);
    this.state = {
      searchterms: '',
      resultsList: [],
      isLoaded: false,
      sortByList: ['Name', 'Alias', 'Sub-Category', 'Category'],
      sortBy: 'Name'
    };
  }

  componentDidMount() {
    const searchterms = history.location.search.substring(7).replace(/,/g, ' ');
    this.setState({
      searchterms,
    });
    this.querySearchTerms(searchterms);
  }

  handleSearchbarUpdate(searchterms) {
    this.setState({ searchterms });
  }

  handleSortUpdate(sortBy) {
    this.setState({ sortBy });
  }

  handleSearchbarSubmit() {
    const { searchterms } = this.state;
    history.push({
      pathname: '/results',
      search: `?terms=${searchterms.split(' ')}`,
    });
    this.querySearchTerms(searchterms);
  }

  querySearchTerms(searchterms) {
    if (!(searchterms)) {
      fetch('/api/disorders')
        .then(res => res.json())
        .then(
          (serverResult) => {
            const filteredServerResult = this.filterServerResult(serverResult);
            JSON.stringify();
            this.setState({
              isLoaded: true,
              resultsList: filteredServerResult,
            });
          }
        );
    } else {
      fetch(`/api/searchDisorderName/${searchterms}`)
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
    const { sortBy, searchterms } = this.state;

    serverResult.sort((a, b) => {
      A = a.category.toUpperCase();
      B = b.category.toUpperCase();
      if (sortBy === 'Name') {
        A = a.name.toUpperCase();
        B = b.name.toUpperCase();
      } else if (sortBy === 'Alias') {
        A = a.alias.toUpperCase();
        B = b.alias.toUpperCase();
      } else if (sortBy === 'Sub-Category') {
        A = a.sub_category.toUpperCase();
        B = b.sub_category.toUpperCase();
      } else if (sortBy === 'Category') {
        A = a.category.toUpperCase();
        B = b.category.toUpperCase();
      }

      if (A === '') {
        return 1;
      }
      if (B === '') {
        return -1;
      }

      if (A < B) {
        return -1;
      }
      if (A > B) {
        return 1;
      }
      return 0;
    });

    if (searchterms != null) {
      for (result = 0; result < serverResult.length; result += 1) {
        if (sortBy === 'Name') {
          const x = this.MatchCount(serverResult[result].name.split(''));
          matchArray.push(x);
        } else if (sortBy === 'Alias') {
          const x = this.MatchCount(serverResult[result].alias.split(''));
          matchArray.push(x);
        } else if (sortBy === 'Sub-Category') {
          const x = this.MatchCount(serverResult[result].sub_category.split(''));
          matchArray.push(x);
        } else if (sortBy === 'Category') {
          const x = this.MatchCount(serverResult[result].category.split(''));
          matchArray.push(x);
        }
      }

      while (ans.length < serverResult.length) {
        maxMatch = -1;
        for (result = 0; result < matchArray.length; result += 1) {
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
    const { searchterms } = this.state;
    const search = searchterms.split('');
    for (nameChar = 0; nameChar < search.length && nameChar < str.length; nameChar += 1) {
      if (search[nameChar].toUpperCase() === str[nameChar].toUpperCase()) {
        match += 1;
      } else {
        return match;
      }
    }
    return match;
  }

  displayDisorderResults() {
    const { isLoaded, resultsList } = this.state;
    if (isLoaded) {
      if (resultsList.length > 0) {
        return resultsList.map(entry => (
          <DisorderResult
            className="disorder-result"
            title={entry.name}
            category={entry.category}
            subCategory={entry.sub_category}
            diagnosticCriteria={entry.diagnostic_criteria}
            description={entry.description}
          />
        ));
      }
      return <h2 className="no-results">No results</h2>;
    }
    return <p>{/* Fancy loading animation */}</p>;
  }

  render() {
    const {
      searchterms, sortBy, sortByList, resultsList, isLoaded
    } = this.state;

    return (
      <div className="results">
        <Navbar />
        <div className="search-results-container">
          <h2 className="search-results-title">Search Results</h2>
          <SortMenu
            list={sortByList}
            searchterms={searchterms}
            onSortSubmit={this.handleSearchbarSubmit}
            onSortUpdate={this.handleSortUpdate}
            sortBy={sortBy}
          />
          <ResultsSearchbar
            className="search-bar"
            searchterms={searchterms}
            onSearchbarUpdate={this.handleSearchbarUpdate}
            onSearchbarSubmit={this.handleSearchbarSubmit}
          />
          <p className="sortedBy">
            {resultsList.length}
            {' '}
            entries sorted by
            {' '}
            {sortBy}
          </p>
          <div className="results-entries">
            {this.displayDisorderResults(isLoaded, resultsList)}
          </div>
        </div>
      </div>
    );
  }
}
