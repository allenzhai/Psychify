/* eslint-disable jest/no-commented-out-tests */
require('dotenv').config();

const request = require('supertest');
const app = require('../app');

function searchSucceeded(done) {
  request(app).get('/api/disorder/search?terms=p&sortBy=')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    }).catch((err) => {
      done(err);
    });
}

describe('test /api/disorder/search', () => {
  it('should response the GET method', searchSucceeded);
});
