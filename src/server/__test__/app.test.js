require('dotenv').config();

const request = require('supertest');
const app = require('../app');

describe('test the root path', () => {
  it('should response the GET method', () => new Promise((done) => {
    request(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  }));
});

describe('test api call', () => {
  it('should response the GET method', () => new Promise((done) => {
    request(app)
      .get('/api/disorders')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  }));
});

describe('test api call', () => {
  it('should response the GET method', () => new Promise((done) => {
    request(app)
      .get('/api/searchDisorderName/:disorder')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  }));
});

// describe('test api call', () => {
//   it('should response the GET method', () => new Promise((done) => {
//     request(app)
//       .get('/api/login/testUsername')
//       .then((response) => {
//         expect(response.statusCode).toBe(200);
//         done();
//       });
//   }));
// });

// describe('test api call', () => {
//   it('should response the POST method', () => new Promise((done) => {
//     const sampleUser = {
//       username: 'test',
//       password: 'test',
//       email: 'test'
//     };
//     request(app)
//       .post('/api/register', sampleUser)
//       .then((response) => {
//         expect(response.statusCode).toBe(200);
//         done();
//       });
//   }));
// });
