/* eslint-disable jest/expect-expect */
require('dotenv').config();

const request = require('supertest');
const app = require('../app');

function identidyFailed(done) {
  request(app).get('/api/me')
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

// without credentials
function loginFailed1(done) {
  request(app).post('/api/login')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      const { code, message } = response.body;
      expect(code).toBe(1);
      expect(message).toBe('Invalid login credentials.');
      done();
    })
    .catch((err) => {
      done(err);
    });
}

// with incorrect credentials
function loginFailed2(done) {
  request(app).post('/api/login')
    .send({ username: 'not existed', password: 'not existed password' })
    .set('Accept', 'application/json')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      const { code, message } = response.body;
      expect(code).toBe(1);
      expect(message).toBe('Invalid login credentials.');
      done();
    })
    .catch((err) => {
      done(err);
    });
}

function loginSucceeded(done) {
  request(app).post('/api/login')
    .send({ username: 'test', password: 'test' })
    .set('Accept', 'application/json')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      const { code, message } = response.body;
      expect(code).toBe(0);
      expect(message).toBe('successful login');
      done();
    })
    .catch((err) => {
      done(err);
    });
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

describe('test /api/me', () => {
  it('should response the GET method', identidyFailed);
});

describe('test /api/login', () => {
  it('should fail to log in without credentials', loginFailed1);
  it('should fail to log in with incorrect credentials', loginFailed2);
  it('should log in successfully', loginSucceeded);
});

describe('test /api/register', () => {
  it('should fail to register without required inputs', registerFailed1);
});
