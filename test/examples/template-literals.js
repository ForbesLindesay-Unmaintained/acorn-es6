'use strict';

var assert = require('assert');

assert(`Hello\nWorld` === 'Hello\nWorld');

assert(`Hello
World` === 'Hello\nWorld');

var x = 5, y = 10;
assert(`${x} + ${y} = ${ x + y}` === '5 + 10 = 15');
