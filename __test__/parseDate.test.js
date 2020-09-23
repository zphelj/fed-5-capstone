// Test the data function

import { parseDate } from '../src/client/js/travel_functions';

const date1 = new Date('2020-08-01');

describe("Testing the Parse Date functionality", () => {
  test("Testing the parseDate() function", () => {
      let result = parseDate('2020-08-01');
      expect(result.toUTCString).toBe(date1.toUTCString);
})});