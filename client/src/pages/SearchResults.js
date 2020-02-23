import React, {Component} from 'react';
import {Navbar} from './components/Navbar.js';
import { Searchbar } from './components/Searchbar.js';
//import { DisorderDetails } from './components/DisorderDetails.js';
import { DisorderResult } from './components/DisorderResult';
import './components/style/SearchResults.css';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');
export class SearchResults extends React.Component {
  render() {
    return (
      <div className="results">
        <Navbar />
        <Searchbar className="search-bar"/>
        <div className="results-entries">
          <DisorderResult className="disorder-result" title="Disorder Name" subtitle="Subtitle" content 
            detailedContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Maecenas ullamcorper, sapien et luctus venenatis, magna risus sagittis lorem, 
            sed euismod arcu massa vitae ligula. Vivamus pretium mi ut dui dignissim cursus. "/>
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