//const { app } = require('../src/client/js/app');
const app = require('../src/server/server'); // Link to your server file
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