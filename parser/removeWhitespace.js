const fs = require('fs');
const pool = require('../src/server/database');

function removeWhitespace() {
  let stm = 'UPDATE DisorderNames SET name = REPLACE(name, \'\r\', \'\');';
  console.log(stm);
  pool.query(stm).then().catch(err => console.log(err));
  stm = 'UPDATE DisorderNames SET name = REPLACE(name, \'\n\', \'\');';
  console.log(stm);
  pool.query(stm).then().catch(err => console.log(err));
  stm = 'SELECT name FROM DisorderNames\nWHERE description IS NULL';
  console.log(stm);
  pool.query(stm).then((rows) => {
    let names = [];
    rows.forEach((row) => {
      const { name } = row;
      names.push(row.name);
    });
    console.log(names);
  });

}

function clearData() {
  const stm = 'UPDATE DisorderNames SET description=NULL diagnostic_criteria=NULL diagnostic_code=NULL';
  pool.query(stm).then().catch(err => console.log(err));
}

clearData();
