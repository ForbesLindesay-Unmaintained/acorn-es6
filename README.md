# acorn-es6

[![Greenkeeper badge](https://badges.greenkeeper.io/ForbesLindesay/acorn-es6.svg)](https://greenkeeper.io/)

Support many ES6 features with no runtime requirements.  Sometimes this results in more code, but it provides a much cleaner build system.  Things like `Map`, `Set`, `Symbol` etc. must be polyfilled separately if you wish to use them.  This module only aims to provide syntax extensions.

[![Build Status](https://img.shields.io/travis/ForbesLindesay/acorn-es6/master.svg)](https://travis-ci.org/ForbesLindesay/acorn-es6)
[![Dependency Status](https://img.shields.io/david/ForbesLindesay/acorn-es6.svg)](https://david-dm.org/ForbesLindesay/acorn-es6)
[![NPM version](https://img.shields.io/npm/v/acorn-es6.svg)](https://www.npmjs.org/package/acorn-es6)

## Installation

    npm install acorn-es6

## Usage

```js
var compile = require('acorn-es6');

var compiled = compile('var log = msg => console.log(msg);');
// => "var log = function (msg) { console.log(msg); };"
```

You can also use it as a browserify transform by specifying the transform as `acorn-es6/browserify`.

## Supported ES6 features

### arrowFunctions

```js
var log = msg => console.log(msg);
```

### defaultParameters

```js
function logDeveloper(name, codes = 'JavaScript', livesIn = 'USA') {
  console.log('name: %s, codes: %s, lives in: %s', name, codes, livesIn);
}
```

### forOf

```js
for (var element of [1, 2, 3]) {
  console.log('element:', element);
}
```

### propertyMethods

```js
var object = {
  prop: 42,
  // No need for function
  method() {
    return this.prop;
  }
};
```

### templateLiterals

```js
var x = 5, y = 10;
console.log(`${x} + ${y} = ${ x + y}`);
// 5 + 10 = 15
```

### restParameters

```js
function printList(listname, ...items) {
  console.log('list %s has the following items', listname);
  items.forEach(function (item) { console.log(item); });
}
```

### spread

```js
function add(x, y) {
  console.log('%d + %d = %d', x, y, x + y);
}
var numbers = [5, 10]
add(...numbers);
// 5 + 10 = 15
```

## License

  MIT
