'use strict';

var assert = require('assert');

var add30 = val => val + 30;
assert(add30(12) === 42);

(function () {
  assert(this.x === 100);
  var getX = () => this.x;
  assert(getX() === 100);
}.call({x: 100}));

var add = (...values) => {
  var sum = 0;
  values.forEach(function (value) {
    sum += value;
  });
  return sum;
};
assert(add(10, 10, 10, 12) === 42);
