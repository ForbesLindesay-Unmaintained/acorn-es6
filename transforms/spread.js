'use strict';

var transform = require('../lib/transform.js');

module.exports = function (src) {
  return transform(src, {
    CallExpression: function (node) {
      if (node.arguments.length && node.arguments[node.arguments.length - 1].type === 'SpreadElement') {
        var callee;
        var self;
        if (node.callee.type === 'MemberExpression') {
          self = transform.getTemp();
          callee = self + ' = ' + transform.getSource(node.callee.object) + ',' + self;
          if (node.callee.computed) {
            callee += '[' + transform.getSource(node.callee.property) + ']';
          } else {
            callee += '.' + transform.getSource(node.callee.property);
          }
        } else {
          self = 'null';
          callee = transform.getSource(node.callee);
        }
        var args;
        if (node.arguments.length === 1) {
          args = transform.getSource(node.arguments[0].argument);
        } else {
          args = '[' + node.arguments
            .slice(0, node.arguments.length - 1)
            .map(transform.getSource).join(', ') + '].concat(' +
            transform.getSource(node.arguments[node.arguments.length - 1].argument) + ')';
        }
        transform.setSource(node, callee + '.apply(' + self + ', ' + args + ')');
      }
    }
  });
};
