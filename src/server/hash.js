const cryptoRandomString = require('crypto-random-string');
const crypto = require('crypto');

exports.simpleHash = password => password;

exports.passwordHash = (password) => {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
};

exports.generateSalt = () => cryptoRandomString(8);
