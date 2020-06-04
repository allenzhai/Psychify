const cryptoRandomString = require('crypto-random-string');
const crypto = require('crypto');

exports.passwordHash = (password) => {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
};

exports.generateSalt = () => cryptoRandomString({ length: 8 });
