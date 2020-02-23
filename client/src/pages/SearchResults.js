import React, {Component} from 'react';
import {Navbar} from './components/Navbar.js';
import { ResultsSearchbar } from './components/ResultsSearchbar.js';
import { DisorderDetails } from './components/DisorderDetails.js';
import { DisorderResult } from './components/DisorderResult';
import './components/style/SearchResults.css';

export class SearchResults extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      results: [{title: "Disorder Name", subtitle: "Subtitle with some info", content: "Some more verbose content can be shown here"},
                {title: "Disorder Name", subtitle: "Subtitle with some info", content: "Some more verbose content can be shown here"},
                {title: "Disorder Name", subtitle: "Subtitle with some info", content: "Some more verbose content can be shown here"},
                {title: "Disorder Name", subtitle: "Subtitle with some info", content: "Some more verbose content can be shown here"},
                {title: "Disorder Name", subtitle: "Subtitle with some info", content: "Some more verbose content can be shown here"},
                {title: "Disorder Name", subtitle: "Subtitle with some info", content: "Some more verbose content can be shown here"},
                {title: "Disorder Name", subtitle: "Subtitle with some info", content: "Some more verbose content can be shown here"},
                {title: "Disorder Name", subtitle: "Subtitle with some info", content: "Some more verbose content can be shown here"},]
    }
  }


  render() {
    return (
      <div className="results">
        <Navbar />
        <div className="search-results-container">
          <ResultsSearchbar className="search-bar"/>
          <div className="results-entries">
            {this.state.results.map((entry) => <DisorderResult className="disorder-result" title={entry.title} subtitle={entry.subtitle} content={entry.content}/>)}
            {/* <DisorderResult className="disorder-result" title="Disorder Name" subtitle="Subtitle" content/> */}
          </div>
        </div>
      </div>
    );
  }
}