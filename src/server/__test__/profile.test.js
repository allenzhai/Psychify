const cryptoRandomString = require('crypto-random-string');

require('dotenv').config();

const request = require('supertest');
const app = require('../app');
const pool = require('../database');

function registerTestUser() {
  const username = 'test';
  const email = 'test@test.com';
  const password = 'test';
  request(app).post('/api/register')
    .send({ username, email, password })
    .set('Accept', 'application/json');
}

// without required inputs
function profileFailed(done) {
  request(app).get('/api/getProfile/none')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      const { code, message } = response.body;
      expect(code).toBe(2);
      expect(message).toBe('Invalid Token');
      done();
    })
    .catch((err) => {
      done(err);
    });
}

describe('test user profile', () => {
  beforeAll(() => registerTestUser());
  afterAll(() => pool.end());

  it('should fail to retrieve profil without token', profileFailed);
});
