/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

import '../style/TagList.css';

const extractTags = (datasource, filterKey) => {
  if (filterKey === 'name') {
    return [];
  }

  const tags = {};
  datasource.forEach((entry) => {
    let count = 1;
    const keyContent = entry[filterKey];
    if (Object.prototype.hasOwnProperty.call(tags, keyContent)) {
      count = tags[keyContent] + 1;
    }
    tags[keyContent] = count;
  });

  const tagArray = Object.keys(tags).map(key => ({
    name: key,
    count: tags[key]
  }));

  return tagArray;
};

function TagList({ datasource, filterKey, onSelectionChange }) {
  const tags = extractTags(datasource, filterKey);
  // null and undefined are two different things
  const [selection, setSelection] = useState(null);
  console.log('selection', selection);

  const onTagClick = (event) => {
    const tagName = event.target.value;
    tags.filter(tag => tagName === tag.name).forEach((value) => {
      const newSelection = value.name === selection ? null : value.name;
      setSelection(newSelection);
      onSelectionChange(newSelection);
    });
  };

  const uiList = tags.map((tag) => {
    let cls = 'tag-btn';
    cls += selection === tag.name ? ' tag-btn-selected' : '';
    return (
      <Button key={tag.name} className={cls} onClick={onTagClick} value={tag.name}>
        <span>{tag.count}</span>
        {tag.name === '' ? 'Other' : tag.name}
      </Button>
    );
  });

  if (tags.length === 0) {
    return '';
  }

  return (
    <div className="taglist">
      {uiList}
    </div>
  );
}

TagList.propTypes = {
  datasource: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    sub_category: PropTypes.string,
    alias: PropTypes.string,
    diagnostic_code: PropTypes.string,
    diagnostic_criteria: PropTypes.string
  })).isRequired,
  filterKey: PropTypes.string.isRequired,
  onSelectionChange: PropTypes.func.isRequired
};

export default TagList;
