const fs = require('fs');
const pool = require('../src/server/database');

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
