const cryptoRandomString = require('crypto-random-string');

exports.simpleHash = password => password;

exports.generateSalt = () => cryptoRandomString(8);
