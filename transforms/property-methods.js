'use strict';

var transform = require('../lib/transform.js');

module.exports = function (src) {
  return transform(src, {
    Property: function (node) {
      if (node.method === true) {
        transform.setSource(node, transform.getSource(node.key) + ': function ' + transform.getSource(node));
      }
    }
  });
};
