// Test the toDays function

import { toDays } from '../src/client/js/travel_functions';

const date1 = new Date('2010-08-01');

describe("Testing the Parse Date functionality", () => {
  test("Testing the parseDate() function", () => {
      let result = toDays(date1);
      expect(result).toBe(14822);
})});