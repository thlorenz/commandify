'use strict';
/*jshint asi: true */

var test = require('tap').test
var browserify = require('browserify');
var fs = require('fs');
var existsSync = fs.existsSync || require('path').existsSync;
var commandify = require('../');

var proofFile = __dirname + '/makeify/proof.txt';

function setup() {
  if (existsSync(proofFile)) fs.unlinkSync(proofFile);
}

test('\nrunning browserify on a package with commandify transform registered in package.json', function (t) {
  setup();
  browserify()
    .require(require.resolve('./makeify/main.js'), { entry: true })
    .bundle(function (err, res) {
      if (err) { t.fail(err); return t.end(); }
      t.ok(res.length, 'produces bundle')
      var proof = fs.readFileSync(proofFile, 'utf8');
      t.equal(proof, 'hi\n', 'executes command exactly once')
      t.end()
    });
})

test('\nrunning browserify on a package with commandify transform registered in package.json which is overridden via variable', function (t) {
  setup();
  commandify.command = 'make hello';
  commandify.dir     = __dirname + '/makeify';
  browserify()
    .require(require.resolve('./makeify/main.js'), { entry: true })
    .bundle(function (err, res) {
      if (err) { t.fail(err); return t.end(); }

      t.ok(res.length, 'produces bundle')
      var proof = fs.readFileSync(proofFile, 'utf8');
      t.equal(proof, 'hello\n', 'executes overridden command exactly once')
      t.end()
    });
})
