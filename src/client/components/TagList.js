/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

import '../style/TagList.css';

function Tag({ name, remove }) {
  const onRemove = () => {
    remove(name);
  };

  return (
    <Button className="tag-btn " onClick={onRemove}>
      {name}
      <i className="far fa-times-circle" />
    </Button>
  );
}

Tag.propTypes = {
  name: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired
};

function TagList({ tags }) {
  const [noShowList, setNoShowList] = useState([]);

  const onTagRemove = (name) => {
    const updated = noShowList.concat(name);
    setNoShowList(updated);
  };

  const showList = tags
    .filter(tag => noShowList.indexOf(tag) === -1)
    .map(value => (
      <Tag key={value} name={value} remove={onTagRemove} />
    ));

  if (tags.length === 0) {
    return '';
  }

  return (
    <div className="taglist">
      {showList}
    </div>
  );
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default TagList;
