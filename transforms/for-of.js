'use strict';

var transform = require('../lib/transform.js');

module.exports = function (src) {
  return transform(src, {
    ForOfStatement: function (node) {
      var result = '';
      var list = transform.getTemp();
      var iterator = transform.getTemp();
      var index = transform.getTemp();
      result += 'var ' + list + ' = ' + transform.getSource(node.right) + ';';
      result += 'if (typeof ' + list + ' === "string" || Array.isArray(' + list + ')) {'
      result += '  for (var ' + index + ' = 0; ' + index + ' < ' + list + '.length; ' + index + '++) {';
      result += transform.getSource(node.left) + ' = ' + list + '[' + index + '];';
      result += transform.getSource(node.body);
      result += '  }';
      result += '} else if (typeof Symbol !== "undefined" && ' + list + ' && ' + list + '[Symbol.iterator]) {'
      result += 'var ' + iterator + ' = ' + list + '[Symbol.iterator]();';
      result += 'for (var ' + index + ';!(' + index + ' = ' + iterator + '.next()).done; ) {';
      result += transform.getSource(node.left) + ' = ' + index + '.value;';
      result += transform.getSource(node.body);
      result += '}';
      result += '}';
      transform.setSource(node, result);
    }
  });
};
