import React, {Component} from 'react';
import {Navbar} from './components/Navbar.js';

import { ResultsSearchbar } from './components/ResultsSearchbar.js';
import { DisorderDetails } from './components/DisorderDetails.js';

import { DisorderResult } from './components/DisorderResult';
import './components/style/SearchResults.css';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');
export class SearchResults extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      results: [{title: "Disorder Name", subtitle: "Subtitle with some info", content: "Some more verbose content can be shown here", detailedContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Maecenas ullamcorper, sapien et luctus venenatis, magna risus sagittis lorem, 
            sed euismod arcu massa vitae ligula. Vivamus pretium mi ut dui dignissim cursus. "},
                {title: "Disorder Name", subtitle: "Subtitle with some info", content: "Some more verbose content can be shown here", detailedContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Maecenas ullamcorper, sapien et luctus venenatis, magna risus sagittis lorem, 
            sed euismod arcu massa vitae ligula. Vivamus pretium mi ut dui dignissim cursus. "},
                {title: "Disorder Name", subtitle: "Subtitle with some info", content: "Some more verbose content can be shown here", detailedContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Maecenas ullamcorper, sapien et luctus venenatis, magna risus sagittis lorem, 
            sed euismod arcu massa vitae ligula. Vivamus pretium mi ut dui dignissim cursus. "},
                {title: "Disorder Name", subtitle: "Subtitle with some info", content: "Some more verbose content can be shown here", detailedContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Maecenas ullamcorper, sapien et luctus venenatis, magna risus sagittis lorem, 
            sed euismod arcu massa vitae ligula. Vivamus pretium mi ut dui dignissim cursus. "},
                {title: "Disorder Name", subtitle: "Subtitle with some info", content: "Some more verbose content can be shown here", detailedContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Maecenas ullamcorper, sapien et luctus venenatis, magna risus sagittis lorem, 
            sed euismod arcu massa vitae ligula. Vivamus pretium mi ut dui dignissim cursus. "},
                {title: "Disorder Name", subtitle: "Subtitle with some info", content: "Some more verbose content can be shown here", detailedContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Maecenas ullamcorper, sapien et luctus venenatis, magna risus sagittis lorem, 
            sed euismod arcu massa vitae ligula. Vivamus pretium mi ut dui dignissim cursus. "},
                {title: "Disorder Name", subtitle: "Subtitle with some info", content: "Some more verbose content can be shown here", detailedContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Maecenas ullamcorper, sapien et luctus venenatis, magna risus sagittis lorem, 
            sed euismod arcu massa vitae ligula. Vivamus pretium mi ut dui dignissim cursus. "},
                {title: "Disorder Name", subtitle: "Subtitle with some info", content: "Some more verbose content can be shown here", detailedContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Maecenas ullamcorper, sapien et luctus venenatis, magna risus sagittis lorem, 
            sed euismod arcu massa vitae ligula. Vivamus pretium mi ut dui dignissim cursus. "},]
    }
  }

  render() {
    return (
      <div className="results">
        <Navbar />
        <div className="search-results-container">
          <h2 className="search-results-title">Search Results</h2>
          <ResultsSearchbar className="search-bar"/>
          <div className="results-entries">
            {this.state.results.map((entry) => <DisorderResult className="disorder-result" title={entry.title} subtitle={entry.subtitle} content={entry.content} detailedContent={entry.detailedContent}/>)}
            {/* <DisorderResult className="disorder-result" title="Disorder Name" subtitle="Subtitle" content/> */}
          </div>
        </div>
      </div>
    );
  }
}