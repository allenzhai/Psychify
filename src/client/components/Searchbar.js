import React, { useState } from 'react';
import { createBrowserHistory } from 'history';

import '../style/Searchbar.css';

export default function Searchbar(props) {
  const { show } = props;
  const [searchTerms, setSearchTerms] = useState('');
  const history = createBrowserHistory({
    forceRefresh: true
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push({
      pathname: '/results',
      search: `?terms=${searchTerms}`
    });
  };

  const handleChange = (event) => {
    // Called every time the searchbar text changes
    setSearchTerms(event.target.value);
  };

  return (
    <div className={show}>
      <form className="form-large" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search"
          placeholder="Enter Symptoms e.g. 'Trouble Sleeping'"
          autoComplete="off"
          value={searchTerms}
          onChange={handleChange}
        />
      </form>
      {/* <form className="form-small" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search"
          placeholder="Search"
          autoComplete="off"
          value={searchTerms}
          onChange={handleChange}
        />
      </form> */}
    </div>
  );
}
