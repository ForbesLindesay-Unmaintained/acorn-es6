'use strict';

var assert = require('assert');

var x = [1, 2, 3];
var sum = 0;
for (var value of x) {
  sum += value;
}
assert(sum === 6);
