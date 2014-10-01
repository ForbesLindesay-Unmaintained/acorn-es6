'use strict';

var fs = require('fs');
var util = require('util');
var test = require('testit');
var acorn = require('acorn');
var rimraf = require('rimraf').sync;
var mkdirp = require('mkdirp').sync;
var transform = require('../');

rimraf(__dirname + '/ast');
mkdirp(__dirname + '/ast');
rimraf(__dirname + '/output');
mkdirp(__dirname + '/output');

fs.readdirSync(__dirname + '/examples').forEach(function (file) {
  // see https://github.com/marijnh/acorn/issues/129
  test(file, function () {
    var src = fs.readFileSync(__dirname + '/examples/' + file, 'utf8');
    var ast = acorn.parse(src, {ecmaVersion: 6});
    fs.writeFileSync(__dirname + '/ast/' + file, util.inspect(ast, {depth: 100}));
    var output = transform(src);
    fs.writeFileSync(__dirname + '/output/' + file, output);
    require('./output/' + file);
  });
});
