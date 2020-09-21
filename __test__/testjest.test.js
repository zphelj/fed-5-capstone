import { testjest } from '../src/server/svrfuncs.mjs';

// needed to resolve ReferenceError: regeneratorRuntime is not defined errors
//require('regenerator-runtime/runtime');

// need a mock fetch
/* const test_response = 'peanut butter';
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(test_response),
  })
);

beforeEach(() => {
  fetch.mockClear();
}); */

describe("Testing testjest() functionality", () => {
  test("Testing the testjest() function", () => {
    expect(testjest).toBe(true);
    });
});