/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import '../style/SortMenu.css';

function SortMenu({ list, onSortUpdate }) {
  const [listOpen, setListOpen] = useState(false);
  const headerTitle = 'Sort By';
  const outer = useRef();

  const toggleList = () => {
    setListOpen(!listOpen);
  };

  const toggleSelected = (e) => {
    toggleList();
    onSortUpdate(e.target.innerText);
  };

  const handleClick = (e) => {
    if (!outer.current.contains(e.target)) {
      setListOpen(false);
    }
    return 0;
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick, false);
    return () => document.removeEventListener('mousedown', handleClick, false);
  }, []);

  const listView = listOpen && (
    <ul className="sortbyList">
      {list.map(entry => (
        <li key={entry} className="sortby-list-item" onClick={toggleSelected}>
          {entry}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="sortbyList-container" ref={outer}>
      <div className="sortby-header" onClick={() => toggleList()} role="button" tabIndex={0}>
        <div className="sortby-header-title">{headerTitle}</div>
      </div>
      {listView}
    </div>
  );
}

SortMenu.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSortUpdate: PropTypes.func.isRequired
};

export default SortMenu;
