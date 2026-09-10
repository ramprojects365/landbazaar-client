import test from "node:test";
import assert from "node:assert/strict";
import { shuffleArray } from "./shuffleArray.js";

test("shuffleArray keeps the same items while randomizing order", () => {
  const input = [1, 2, 3, 4, 5];
  const result = shuffleArray(input);

  assert.equal(result.length, input.length);
  assert.deepEqual([...result].sort((a, b) => a - b), [1, 2, 3, 4, 5]);
  assert.ok(result.some((value, index) => value !== input[index]) || result.join(",") === input.join(","));
});
