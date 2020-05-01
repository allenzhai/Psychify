import React from 'react';
import PropTypes from 'prop-types';

import DisorderResult from './DisorderResult';

function ResultList({ datasource, filter, filterKey }) {
  console.log(datasource);
  const dataset = datasource.filter((result) => {
    if (filter === null) { // no filter
      return true;
    }

    return result[filterKey] === filter;
  });

  const uiList = dataset.map(data => (
    <DisorderResult key={data.name} result={data} />
  ));

  if (dataset.length === 0) {
    return (<h2 className="no-results">No results</h2>);
  }

  return (
    <div className="resultlist">
      {uiList}
    </div>
  );
}

ResultList.propTypes = {
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
  filter: PropTypes.string.isRequired,
  filterKey: PropTypes.string.isRequired
};

export default ResultList;
