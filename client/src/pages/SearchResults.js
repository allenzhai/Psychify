import React, {Component} from 'react';
import {Navbar} from './components/Navbar.js';
import { Searchbar } from './components/Searchbar.js';
import { DisorderDetails } from './components/DisorderDetails.js';
import { DisorderResult } from './components/DisorderResult';
import './components/style/SearchResults.css';

export class SearchResults extends React.Component {

  render() {
    return (
      <div className="results">
        <Navbar />
        <Searchbar className="search-bar"/>
        <div className="results-entries">
          <DisorderResult className="disorder-result" title="Disorder Name" subtitle="Subtitle" content/>
          <DisorderResult className="disorder-result" title="Disorder Name" subtitle="Subtitle" content/>
          <DisorderResult className="disorder-result" title="Disorder Name" subtitle="Subtitle" content/>
          <DisorderResult className="disorder-result" title="Disorder Name" subtitle="Subtitle" content/>
          <DisorderResult className="disorder-result" title="Disorder Name" subtitle="Subtitle" content/>
          <DisorderResult className="disorder-result" title="Disorder Name" subtitle="Subtitle" content/>
          <DisorderResult className="disorder-result" title="Disorder Name" subtitle="Subtitle" content/>
          <DisorderResult className="disorder-result" title="Disorder Name" subtitle="Subtitle" content/>
          <DisorderResult className="disorder-result" title="Disorder Name" subtitle="Subtitle" content/>
          <DisorderResult className="disorder-result" title="Disorder Name" subtitle="Subtitle" content/>
          <DisorderResult className="disorder-result" title="Disorder Name" subtitle="Subtitle" content/>
          <DisorderResult className="disorder-result" title="Disorder Name" subtitle="Subtitle" content/>
        </div>
      </div>
    );
  }
}