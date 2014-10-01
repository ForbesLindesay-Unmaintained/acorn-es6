'use strict';

var Transform = require('stream').Transform;
var compile = require('./');

module.exports = function (file) {
  var stream = new Transform();
  var source = '';
  stream._transform = function (chunk, encoding, callback) {
    source += chunk;
    callback();
  };
  stream._flush = function (callback) {
    stream.push(compile(source))
    callback();
  };
  return stream;
};
