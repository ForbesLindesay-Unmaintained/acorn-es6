'use strict';

var assert = require('assert');

var object = {
  prop: 42,
  // No need for function
  method() {
    return this.prop;
  }
};

assert(object.method() === 42);
