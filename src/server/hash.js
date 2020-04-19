const cryptoRandomString = require('crypto-random-string')

function simpleHash(password) {
  return password;
}

function generateSalt() {
  return cryptoRandomString({length:8});
}
