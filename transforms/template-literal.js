'use strict';

var transform = require('../lib/transform.js');
var stringify = require('./utils/stringify');

module.exports = function (src) {
  return transform(src, {
    TemplateLiteral: function (node) {
      // use cooked
      var result = [];
      for (var i = 0; i < node.quasis.length; i++) {
        result.push(stringify(node.quasis[i].value.cooked));
        if (node.expressions.length > i) {
          result.push('(' + transform.getSource(node.expressions[i]) + ')');
        }
      }
      transform.setSource(node, result.join(' + '));
    }
  });
};


/*
{ type: 'TemplateLiteral',
  start: 41,
  end: 66,
  expressions:
   [ { type: 'Identifier', start: 44, end: 45, name: 'x' },
     { type: 'Identifier', start: 51, end: 52, name: 'y' },
     { type: 'BinaryExpression',
       start: 59,
       end: 64,
       left: { type: 'Identifier', start: 59, end: 60, name: 'x' },
       operator: '+',
       right: { type: 'Identifier', start: 63, end: 64, name: 'y' } } ],
  quasis:
   [ { type: 'TemplateElement',
       start: 42,
       end: 42,
       value: { cooked: '', raw: '' },
       tail: false },
     { type: 'TemplateElement',
       start: 46,
       end: 49,
       value: { cooked: ' + ', raw: ' + ' },
       tail: false },
     { type: 'TemplateElement',
       start: 53,
       end: 56,
       value: { cooked: ' = ', raw: ' = ' },
       tail: false },
     { type: 'TemplateElement',
       start: 65,
       end: 65,
       value: { cooked: '', raw: '' },
       tail: true } ] }
       */
