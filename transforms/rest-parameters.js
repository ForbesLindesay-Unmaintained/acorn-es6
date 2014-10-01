'use strict';

var transform = require('../lib/transform.js');
var getParams = require('./utils/get-params.js');

module.exports = function (src) {
  return transform(src, {
    Function: function (node) {
      if (node.body.type === 'BlockStatement' && node.rest) {
        var result = 'function ';
        if (node.id) result += transform.getSource(node.id);
        result += '(' + getParams(node, {rest: false}) + ') ';
        result += '{';
        result += 'var ' + transform.getSource(node.rest) + ' = [];';
        var temp = transform.getTemp();
        result += 'for (var ' + temp + ' = ' + node.params.length + '; ' +
          temp + ' < arguments.length; ' +
          temp + '++) {' +
          transform.getSource(node.rest) + '.push(arguments[' + temp + ']);}';
        result += transform.getSource(node.body).substr(1);
        transform.setSource(node, result);
      }
    }
  });
};
