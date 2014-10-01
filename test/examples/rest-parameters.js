'use strict';

var assert = require('assert');

function star(value, ...items) {
  return items.map(function (item) { return item * value; });
}

assert.deepEqual(star(2, 1, 2, 3), [2, 4, 6]);
