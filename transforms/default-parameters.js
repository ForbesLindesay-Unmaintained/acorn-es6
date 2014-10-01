'use strict';

var transform = require('../lib/transform.js');
var getParams = require('./utils/get-params.js');

module.exports = function (src) {
  return transform(src, {
    Function: function (node) {
      if (node.body.type === 'BlockStatement' && node.defaults.some(notNull)) {
        var result = 'function ';
        if (node.id) result += transform.getSource(node.id);
        result += '(' + getParams(node, {defaults: false}) + ') ';
        result += '{';
        for (var i = 0; i < node.defaults.length; i++) {
          if (node.defaults[i] !== null) {
            result += 'if (' + node.params[i].name + ' === undefined)' +
              node.params[i].name + ' = ' +
              transform.getSource(node.defaults[i]) + ';';
          }
        }
        result += transform.getSource(node.body).substr(1);
        transform.setSource(node, result);
      }
    }
  });
};

function notNull(val) {
  return val !== null;
}
