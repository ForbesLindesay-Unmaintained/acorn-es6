'use strict';

var transform =  require('../../lib/transform');

module.exports = getParams;
function getParams(node, options) {
  options = options || {};
  var defaults = options.defaults !== false;
  var rest = options.rest !== false;
  var result = node.params.map(transform.getSource).map(function (src, i) {
    if (defaults && node.defaults[i]) {
      return src + ' = ' + transform.getSource(node.defaults[i]);
    } else {
      return src;
    }
  });
  if (rest && node.rest) {
    if (node.params.length) result += ', ';
    result += '...' + transform.getSource(node.rest);
  }
  return result;
}
