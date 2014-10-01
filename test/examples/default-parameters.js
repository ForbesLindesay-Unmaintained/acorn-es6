'use strict';

var assert = require('assert');

function normal(x, y = 10) {
  return x + y;
}
assert(normal(32) === 42);
assert(normal(22, 20) === 42);

var arrow = (x, y = 10) => x + y;
assert(arrow(32) === 42);
assert(arrow(22, 20) === 42);
