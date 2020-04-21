require('dotenv').config();

const request = require("supertest");
const app = require("../app");

describe("Test the root path", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      })
  });
});

describe("Test api call", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/api/disorders")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      })
  });
});

describe("Test api call", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/api/searchDisorderName/:disorder")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      })
  });
});

describe("Test api call", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/api/login/testUsername")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      })
  });
});

describe("Test api call", () => {
  test("It should response the POST method", done => {
    const sampleUser = {
      username: 'test',
      password: 'test',
      email: 'test'
    }
    request(app)
      .post("/api/register", sampleUser)
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      })
  });
});
