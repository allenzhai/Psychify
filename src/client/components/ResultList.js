import React from 'react';
import PropTypes from 'prop-types';

import DisorderResult from './DisorderResult';

function ResultList({ isLoading, datasource, filter, filterKey }) {
  console.log(datasource);
  const dataset = datasource.filter((result) => {
    if (filter === null) { // no filter
      return true;
    }

    return result[filterKey] === filter;
  });

  const uiList = !isLoading ? dataset.map((data, i) => {
    let result = (
      <DisorderResult key={data.name} result={data} />
    );
    // Displays dividing line before result if not the last post
    result = (
      <div>
        <hr />
        {result}
      </div>
    );
    return result;
  }) : <div className="loading-icon"><i className="fa fa-circle-notch" /></div>;

  if (dataset.length === 0 && !isLoading) {
    return (<p className="no-results">No results</p>);
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
