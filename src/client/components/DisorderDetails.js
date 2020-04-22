import React from 'react';
import PropTypes from 'prop-types';

import '../style/DisorderDetails.css';

function DisorderDetails(props) {
  const { title, subtitle, content } = props;

  return (
    <div className="disorder-details">
      <h1 className="disorder-title">{title}</h1>
      <h2 className="disorder-subtitle">{subtitle}</h2>
      <p className="disorder-content">{content}</p>
    </div>
  );
}

DisorderDetails.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};


export default DisorderDetails;
