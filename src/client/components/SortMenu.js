/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import '../style/SortMenu.css';

function SortMenu({ list, onSortSubmit, onSortUpdate }) {
  const [listOpen, setListOpen] = useState(false);
  const headerTitle = 'Sort By';
  const outer = useRef();

  const toggleList = () => {
    setListOpen(!listOpen);
  };

  const toggleSelected = (e) => {
    toggleList();
    onSortUpdate(e.target.innerText);
    onSortSubmit();
  };

  const handleClickOutside = () => {
    setListOpen(true);
  };

  const handleClick = (e) => {
    if (!outer.contains(e.target)) {
      handleClickOutside();
    }
    return 0;
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick, false);
    return () => document.removeEventListener('mousedown', handleClick, false);
  }, []);

  const listView = listOpen
    ? (
      <ul className="sortbyList">
        {
          list.map(entry => (
            <li className="sortby-list-item" onClick={toggleSelected}>
              {entry}
            </li>
          ))}
      </ul>
    ) : '';

  return (
    // eslint-disable-next-line no-return-assign
    <div ref={outer}>
      <div className="sortbyList-container">
        <div className="sortby-header" onClick={() => toggleList()} role="button" tabIndex={0}>
          <div className="sortby-header-title">{headerTitle}</div>
        </div>
        {listView}
      </div>
    </div>
  );
}

SortMenu.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSortSubmit: PropTypes.func.isRequired,
  onSortUpdate: PropTypes.func.isRequired
};

export default SortMenu;
