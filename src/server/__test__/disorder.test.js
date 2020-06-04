/* eslint-disable jest/no-commented-out-tests */
require('dotenv').config();

const request = require('supertest');
const app = require('../app');
const pool = require('../database');

function searchSucceeded(done) {
  request(app).get('/api/disorder/search?terms=p&sortBy=')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    }).catch((err) => {
      done(err);
    });
}

function listIndicesSucceeded(done) {
  request(app).get('/api/disorder/a')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    }).catch((err) => {
      done(err);
    });
}

function listNameSucceeded(done) {
  request(app).get('/api/disorder/names')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    }).catch((err) => {
      done(err);
    });
}

describe('test /api/disorder/search', () => {
  afterAll(() => pool.end());

  it('should return search result', searchSucceeded);
  it('should return disorder indices', listIndicesSucceeded);
  it('should return disorder names', listNameSucceeded);
});
