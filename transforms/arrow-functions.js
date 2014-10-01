'use strict';

var walk = require('acorn/util/walk');
var transform = require('../lib/transform.js');
var getParams = require('./utils/get-params.js');

module.exports = function (src) {
  return transform(src, {
    ArrowFunctionExpression: function (node) {
      var result = 'function (' + getParams(node) + ') ';
      if (node.body.type === 'BlockStatement') {
        result += transform.getSource(node.body);
      } else {
        result += '{ return ' + transform.getSource(node.body) + '; }';
      }
      var hasThis = false;
      walk.simple(node, {
        ThisExpression: function () { hasThis = true; }
      });
      if (hasThis) {
        result += '.bind(this)';
      }
      transform.setSource(node, result);
    }
  });
};
