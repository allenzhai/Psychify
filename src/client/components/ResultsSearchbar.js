import React, { useState } from 'react';
import PropTypes from 'prop-types';

import '../style/ResultsSearchbar.css';

function ResultsSearchbar({ terms, onSubmit }) {
  const [searchTerms, setSearchTerms] = useState(terms);

  const handleSubmit = (event) => {
    // Called when you hit 'enter' in the searchbar
    onSubmit(searchTerms);
    event.preventDefault();
  };

  const handleChange = (event) => {
    setSearchTerms(event.target.value);
  };

  return (
    <div className="results-search-parent">
      <form className="form large" onSubmit={handleSubmit}>
        <input
          type="text"
          className="results-search"
          placeholder="Enter Symptoms e.g. 'Trouble Sleeping'"
          autoComplete="off"
          value={searchTerms}
          onChange={handleChange}
        />
      </form>
      <form className="form small" onSubmit={handleSubmit}>
        <input
          type="text"
          className="results-search"
          placeholder="Search"
          autoComplete="off"
          value={searchTerms}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

ResultsSearchbar.propTypes = {
  terms: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default ResultsSearchbar;
