'use strict';

var assert = require('assert');

function add(x, y) {
  return x + y;
}

var numbers = [5, 10]
assert(add(...numbers) === 15);
// 5 + 10 = 15

var num = [5];
assert(add(1, ...num) === 6);
// 1 + 5 = 6

var xVals = [10, 10, 12];
var x = {val: 10};
x.run = function (a, b, c) {
  return this.val + a + b + c;
}
assert(x.run(...xVals) === 41);
assert(x['run'](...xVals) === 41);
