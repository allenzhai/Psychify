const pool = require('../database');

exports.listDisorders = () => {
  const stm = 'SELECT * FROM Disorders';
  return pool.query(stm);
};

exports.queryName = (disorderName, sortBy) => {
  const orderBy = sortBy || 'name';
  const stm = `${'SELECT DISTINCT * FROM Disorders'
    + ' WHERE Name LIKE \'%'}${disorderName}%'`
    + ` OR Alias LIKE '%${disorderName}%'`
    + ` OR Category LIKE '%${disorderName}%'`
    + ` OR Sub_category LIKE '%${disorderName}%'`
    + `order by ${orderBy}`;
  return pool.query(stm);
};
