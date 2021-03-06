'use strict';

var transforms = [
  require('./transforms/arrow-functions.js'),
  require('./transforms/rest-parameters.js'),
  require('./transforms/spread.js'),
  require('./transforms/default-parameters.js'),
  require('./transforms/for-of.js'),
  require('./transforms/property-methods.js'),
  require('./transforms/template-literal.js')
];

module.exports = transform;
function transform(src) {
  transforms.forEach(function (transform) {
    src = transform(src);
  });
  return src;
}
