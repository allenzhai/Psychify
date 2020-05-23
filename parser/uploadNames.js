const fs = require('fs');
const pool = require('../src/server/database');
const aliasList = require('./aliasList.js');

function uploadNames() {
  fs.readFile('parser/listDisorders.txt', 'utf8', (err, data) => {
    if (err) throw err;
    const lines = data.split('\n');
    let category;
    let subcategory;
    let name;
    lines.forEach((item) => {
      console.log(item);
      if (item === '');
      else if (item[0] === 'c') {
        category = item.substring(2);
        subcategory = null;
      } else if (item[0] === 's') {
        subcategory = item.substring(2);
      } else {
        name = item;
        const stm = `INSERT INTO DisorderNames(name, category, sub_category) VALUES("${name}", "${category}", "${subcategory}")`;
        console.log(stm);
        pool.query(stm).then().catch(error => console.log(error));
      }
    });
  });
}

function updateAliases() {
  fs.readFile('parser/listDisorders.txt', 'utf8', (err, data) => {
    if (err) throw err;
    const lines = data.split('\n');
    lines.forEach((item) => {
      if (item === '' || item === 'c' || item === 's');
      else {
        let newDisorderName = item.trim();
        if (item.includes('(')) newDisorderName = item.substring(0, item.indexOf('(') - 1).concat(item.substring(item.indexOf(')') + 1)).trim();
        if (aliasList.aliases.has(newDisorderName)) {
          const alias = aliasList.aliases.get(newDisorderName);
          const stm = `UPDATE DisorderNames\nSET name="${newDisorderName}", alias="${alias}"\nWHERE name="${item}"`;
          console.log(stm);
          pool.query(stm).then().catch(error => console.log(error));
        }
      }
    });
  });
}

function main() {
  const reupload = false;
  const reupdate = false;
  if (reupload) uploadNames();
  if (reupdate) updateAliases();
}

main();
