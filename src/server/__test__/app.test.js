require('dotenv').config();

const request = require('supertest');
const app = require('../app');

function expectLandingPage(done) {
  request(app).get('/*')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    }).catch((err) => {
      done(err);
    });
}

describe('test the root path', () => {
  it('should response the GET method', expectLandingPage);
});
