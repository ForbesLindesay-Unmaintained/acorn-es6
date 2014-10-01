'use strict';

var acorn = require('acorn');
var walk = require('acorn/util/walk');

var index = 0;
module.exports = transform;
function transform(src, walker) {
  var temps = [];
  try {
    var ast = acorn.parse(src, {ecmaVersion: 6});
  } catch (ex) {
    return src;
  }
  src = src.split('');

  function getSource(node) {
    return src.slice(node.start, node.end).join('');
  }
  function setSource(node, str) {
    for (var i = node.start; i < node.end; i++) {
      src[i] = '';
    }
    src[node.start] = str;
  }
  function getTemp() {
    var tmp = '$acorn$es6$' + (index++);
    temps.push(tmp);
    return tmp;
  }
  module.exports.getSource = getSource;
  module.exports.setSource = setSource;
  module.exports.getTemp = getTemp;

  walk.ancestor(ast, walker);

  return (temps.length ? 'var ' + temps.join(', ') + ';' : '') + src.join('');
}
