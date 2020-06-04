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
function registerFailed1(done) {
  request(app).post('/api/register')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      const { code, message } = response.body;
      expect(code).toBe(1);
      expect(message).toBe('Invalid registration inputs.');
      done();
    })
    .catch((err) => {
      done(err);
    });
}

// with duplicate username
function registerFailed2(done) {
  const username = 'test';
  const email = 'test@test.com--test';
  const password = 'test';
  request(app).post('/api/register')
    .send({ username, email, password })
    .set('Accept', 'application/json')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      const { code, message } = response.body;
      expect(code).toBe(1);
      expect(message).toBe('User already exists');
      done();
    })
    .catch((err) => {
      done(err);
    });
}

// with duplicate email
function registerFailed3(done) {
  const username = 'testtest';
  const email = 'test@test.com';
  const password = 'test';
  request(app).post('/api/register')
    .send({ username, email, password })
    .set('Accept', 'application/json')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      const { code, message } = response.body;
      expect(code).toBe(1);
      expect(message).toBe('User already exists');
      done();
    })
    .catch((err) => {
      done(err);
    });
}

function registerSucceeded(done) {
  const username = cryptoRandomString({ length: 6 });
  const email = `${cryptoRandomString({ length: 8 })}@test.com`;
  const password = username;
  request(app).post('/api/register')
    .send({ username, email, password })
    .set('Accept', 'application/json')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      const { code, message, data } = response.body;
      expect(code).toBe(0);
      expect(message).toBe('successful registration');
      expect(data.user).toBe(username);
      expect(data.email).toBe(email);
      expect(data.type).toBe(0);
      done();
    })
    .catch((err) => {
      done(err);
    });
}

describe('test user registration', () => {
  beforeAll(() => registerTestUser());
  afterAll(() => pool.end());

  it('should fail to register without required inputs', registerFailed1);
  it('should fail to register with existing username', registerFailed2);
  it('should fail to register with existing email', registerFailed3);
  it('should register successfully', registerSucceeded);
});
