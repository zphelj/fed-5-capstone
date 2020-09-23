// Tests against server.js using Supertest - tutorial here https://zellwk.com/blog/endpoint-testing/

const app = require('../src/server/server'); // Link to my server file
const supertest = require('supertest');
const request = supertest(app);

// needed to resolve ReferenceError: regeneratorRuntime is not defined errors
require('regenerator-runtime/runtime');

test('Test server.js /Hello get route', async done => {
  const res = await request.get('/hello');
  expect(res.status).toBe(200);
  expect(res.text).toEqual('Hello from server.js ...');
  done();
});

// setup expected default /trip results
const projectData = {
  location: "",
  start_date: "",
  end_date: "",
  pixabay_url: "",
  weather: {}
}

test('Test server.js /trip get route', async done => {
  const res = await request.get('/trip');
  expect(res.status).toBe(200);
  let dataObj = JSON.parse(res.text);
  expect(dataObj).toEqual(projectData);
  done();
});