const fs = require('fs');
const pool = require('../src/server/database');
const aliasList = require('./aliasList.js');
const noDF = require('./noDFDisorder.js');
const regex = /^((\d{3}.\d{2}|\d{3})(\.\S+| \(\S+\)| \[\S+\]),? ?)+$/gm;

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
      if (item === '' || item[0] === 'c' || item[0] === 's');
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

function getDiagnosticFeatures() {
  const noDfDisorders = noDF.disorderList;
  fs.readFile('parser/dsm.txt', 'utf8', (err, dsm) => {
    if (err) throw err;
    const stm = 'SELECT name FROM DisorderNames\nWHERE description IS NULL';
    console.log(stm);
    pool.query(stm).then((rows) => {
      let names = [];
      rows.forEach((row) => {
        names.push(row.name);
      });
      console.log(names);
      const lines = dsm.split('\n');
      let state = 'looking';
      let sentenceEnd = false;
      let name = null;
      let description = '';
      let code = null;
      let numUploads = 0;
      let lineNum = 0;
      let linesSearched = 0;
      lines.forEach((item) => {
        const lowerNames = [];
        names.forEach((disorderName) => {
          lowerNames.push(disorderName.toLowerCase());
        });
        const line = item.trim();
        if (lowerNames.includes(line.toLowerCase())) {
          console.log(`${line} ${lineNum}`);
          name = names[(lowerNames.indexOf(line.toLowerCase()))];
          if (noDfDisorders.includes(line)) state = 'parsing';
          else state = 'found';
          names = names.filter(value => value !== line);
        } else if (state === 'found') {
          linesSearched += 1;
          if (line === 'Diagnostic Features') {
            console.log('found dfs');
            state = 'parsing';
            linesSearched = 0;
          } else if (regex.test(line)) {
            code = line;
          } else if (linesSearched >= 100) {
            state = 'looking';
            linesSearched = 0;
          }
        } else if (state === 'parsing') {
          if (line === '' && sentenceEnd === true) {
            description = description.replace(/'/g, "''");
            let updateStm;
            if (code != null) updateStm = `UPDATE DisorderNames SET description='${description}', diagnostic_code='${code}' WHERE name="${name}"`;
            else updateStm = `UPDATE DisorderNames SET description='${description}' WHERE name="${name}"`;
            console.log(updateStm);
            pool.query(updateStm).then().catch(error => console.log(error));
            name = null;
            description = '';
            state = 'looking';
            numUploads += 1;
          } else if (line === '');
          else if (regex.test(line)) {
            code = line;
          } else {
            if (description !== '') {
              description.concat(' ');
            }
            description = description.concat(line);
            if (line.substring(line.length - 1) === '.') sentenceEnd = true;
            else sentenceEnd = false;
          }
        }
        lineNum += 1;
      });
      console.log(numUploads);
    }).catch(error => console.log(error));
  });
}

function getDiagnosticCriteria() {
  const noDcDisorders = noDF.disorderList;
  fs.readFile('parser/dsm.txt', 'utf8', (err, dsm) => {
    if (err) throw err;
    const stm = 'SELECT name FROM DisorderNames\nWHERE diagnostic_criteria IS NULL';
    console.log(stm);
    pool.query(stm).then((rows) => {
      let names = [];
      rows.forEach((row) => {
        names.push(row.name);
      });
      console.log(names);
      const lines = dsm.split('\n');
      let state = 'looking';
      let sentenceEnd = false;
      let name = null;
      let code = null;
      let dc = '';
      let numUploads = 0;
      let lineNum = 0;
      let linesSearched = 0;
      lines.forEach((item) => {
        const lowerNames = [];
        names.forEach((disorderName) => {
          lowerNames.push(disorderName.toLowerCase());
        });
        const line = item.trim();
        if (lowerNames.includes(line.toLowerCase())) {
          console.log(`${line} ${lineNum}`);
          if (!noDcDisorders.includes(line)) {
            name = names[(lowerNames.indexOf(line.toLowerCase()))];
            state = 'found';
          }
          names = names.filter(value => value !== line);
        } else if (state === 'found') {
          linesSearched += 1;
          if (line === 'Diagnostic Criteria') {
            console.log('found dfs');
            state = 'parsing';
            linesSearched = 0;
          } else if (regex.test(line)) {
            code = line;
          } else if (linesSearched >= 100) {
            state = 'looking';
            linesSearched = 0;
          }
        } else if (state === 'parsing') {
          if (line === '' && sentenceEnd === true) {
            dc = dc.replace(/'/g, "''");
            let updateStm;
            if (code != null && dc !== '') updateStm = `UPDATE DisorderNames SET diagnostic_criteria='${dc}', diagnostic_code='${code}' WHERE name="${name}"`;
            else if (dc !== '') updateStm = `UPDATE DisorderNames SET diagnostic_criteria='${dc}' WHERE name="${name}"`;
            console.log(updateStm);

            if (updateStm) {
              pool.query(updateStm).then().catch(error => console.log(error));
              numUploads += 1;
            }
            name = null;
            dc = '';
            state = 'looking';
          } else if (line === '');
          else {
            if (dc !== '') {
              dc.concat(' ');
            }
            dc = dc.concat(line);
            if (line.substring(line.length - 1) === '.') sentenceEnd = true;
            else sentenceEnd = false;
          }
        }
        lineNum += 1;
      });
      console.log(numUploads);
    }).catch(error => console.log(error));
  });
}

function main() {
  const reupload = false;
  const reupdate = false;
  const getDF = true;
  const getDC = false;
  if (reupload) uploadNames();
  if (reupdate) updateAliases();
  if (getDF) getDiagnosticFeatures();
  if (getDC) getDiagnosticCriteria();
}

main();
