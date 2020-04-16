import React, { useState } from 'react';
import { createBrowserHistory } from 'history';

import './style/Searchbar.css';
import { useHistory } from 'react-router-dom';

export default function Searchbar() {
  const [searchTerms, setSearchTerms] = useState('');
  const history = createBrowserHistory({
    forceRefresh: true
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push({
      pathname: '/results',
      search: '?terms=' + searchTerms.split(' '),
    });
  }

  const handleChange = (event) => {
    //Called every time the searchbar text changes
    setSearchTerms(event.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          className="search"
          placeholder="Enter Symptoms e.g. 'Trouble Sleeping'"
          autoComplete="off"
          value={searchTerms}
          onChange={handleChange} />
      </form>
    </div>
  );
}
