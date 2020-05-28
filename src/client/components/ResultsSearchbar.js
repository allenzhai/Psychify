/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

import '../style/ResultsSearchbar.css';

function ResultsSearchbar({ terms, onSubmit }) {
  const [searchTerms, setSearchTerms] = useState(terms);
  const [autoComplete, setAutoComplete] = useState('');

  let endPoint = `/api/disorder/search?terms=${searchTerms}&sortBy=Name`;
  // eslint-disable-next-line prefer-const
  let [isLoading, data, error] = useFetch(endPoint);


  const handleSubmit = (event) => {
    // Called when you hit 'enter' in the searchbar
    onSubmit(searchTerms);
    setAutoComplete('');
    event.preventDefault();
  };

  const matchCount = (s1, s2) => {
    let count = 0;
    for (let i = 0; i < s1.length; i += 1) {
      if (s1[i] === s2[i]) {
        count += 1;
      } else {
        return count;
      }
    }
    return count;
  };

  const relavance = (searchterm) => {
    let max = 0;
    let current;
    let newAC = '';
    const s = searchterm.toLowerCase();
    for (let j = 0; j < data.length; j += 1) {
      // eslint-disable-next-line prefer-destructuring
      const name = data[j].name.toLowerCase();
      // eslint-disable-next-line prefer-destructuring
      const alias = data[j].alias.toLowerCase();
      // eslint-disable-next-line prefer-destructuring
      const category = data[j].category.toLowerCase();
      // eslint-disable-next-line prefer-destructuring
      // eslint-disable-next-line camelcase
      const sub_category = data[j].sub_category.toLowerCase();

      current = matchCount(s, name);
      if (max < current) {
        max = current;
        newAC = name;
      }

      current = matchCount(s, alias);
      if (max < current) {
        max = current;
        newAC = alias;
      }

      current = matchCount(s, category);
      if (max < current) {
        max = current;
        newAC = category;
      }

      // eslint-disable-next-line camelcase
      if (max < sub_category) {
        max = current;
        // eslint-disable-next-line camelcase
        newAC = sub_category;
      }
    }

    return newAC;
  };

  const updateAC = (s) => {
    endPoint = `/api/disorder/search?terms=${searchTerms}&sortBy=Name`;
    fetch(endPoint).then(res => res.json())
      .then((serverResult) => {
        data = serverResult;
      });

    const first = relavance(s);
    console.log(first);
    let newAC = '';
    if (s !== '') {
      for (let i = s.length; i < first.length; i += 1) {
        newAC += first[i];
      }
    }
    setAutoComplete(newAC);
  };

  const handleChange = (event) => {
    setSearchTerms(event.target.value);
    updateAC(event.target.value);

    if (event.target.value.length === 0) {
      // eslint-disable-next-line no-param-reassign
      event.target.style.width = '100%';
    } else {
      // eslint-disable-next-line no-param-reassign
      event.target.style.width = `${(event.target.value.length + 1) * 10}px`;
    }
  };

  const handleTab = (event) => {
    console.log(event.key);
    if (event.key === 'Tab') {
      event.preventDefault();
      setSearchTerms(searchTerms + autoComplete);
      setAutoComplete('');
    }
    // eslint-disable-next-line no-param-reassign
    event.target.style.width = '100%';
  };

  return (
    <div className="results-search-parent" >
      <div className="bar">
        <form className="form large" onSubmit={handleSubmit} >
          <input
            type="text"
            className="results-search"
            placeholder="Enter Symptoms e.g. 'Trouble Sleeping'"
            autoComplete="off"
            value={searchTerms}
            onChange={handleChange}
            onKeyDown={handleTab}
          />
          <span className="ac">{autoComplete}</span>
        </form>
      </div>
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
