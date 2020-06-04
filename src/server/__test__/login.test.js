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

// with incorrect username
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

// with incorrect password
function loginFailed3(done) {
  request(app).post('/api/login')
    .send({ username: 'test', password: 'wrong test password' })
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

function logoutSucceeded(done) {
  request(app).get('/api/logout')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      const { code, message } = response.body;
      expect(code).toBe(0);
      expect(message).toBe('successful logout');
      done();
    })
    .catch((err) => {
      done(err);
    });
}

describe('test user login and logout', () => {
  beforeAll(() => registerTestUser());
  afterAll(() => pool.end());

  it('should response the GET method', identidyFailed);
  it('should fail to log in without credentials', loginFailed1);
  it('should fail to log in with incorrect username', loginFailed2);
  it('should fail to log in with incorrect password', loginFailed3);
  it('should log in successfully', loginSucceeded);
  it('should logout successfully', logoutSucceeded);
});
