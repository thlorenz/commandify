'use strict';
var through    = require('through2')
  , path       = require('path')
  , exec       = require('child_process').exec
  , findParent = require('find-parent-dir');

var activator;

function resolveCommand(file, cb) {
  if (exports.cmd) return cb(null, { dir: exports.dir, cmd: exports.cmd });

  findParent(file, 'package.json', function (err, dir) {
    if (err) return cb(err);
    if (!dir) return cb(null, null);

    var packfile = path.join(dir, 'package.json');
    var pack = require(packfile);

    cb(null, {dir: dir, cmd: pack.commandify });
  });
}

function executeCommand(cmd, dir, cb) {
  exec(cmd, { cwd: dir }, function (err, stdout, stderr) {
    if (stdout) console.error(stdout);
    if (stderr) console.error(stderr);
    cb(err);
  });
}

exports = module.exports = 

/**
 * browserify transform which executes a shell command exactly once for every time the bundle is created.
 *
 * The command can be configured
 *
 * ##### inside package.json
 *
 * ```json
 * {
 *   "browserify": {
 *     "transform": [ "commandify" ]
 *   },
 *   "commandify": "make all"
 * }
 * ```
 *
 * In this case the command is executed in the directory in which the `package.json` is defined.
 *
 * ##### via environment variables:
 *
 * ```sh
 * COMMANDIFY_CMD='make all' COMMANDIFY_DIR='./compile' browserify main.js .... 
 * ```
 *
 * ##### directly on commandify when bundle step is JavaScript
 *
 * ```js
 * commandify.cmd = 'make hello';
 * commandify.dir = __dirname + '/compile';
 * browserify()
 *   .require(require.resolve('./makeify/main.js'), { entry: true })
 *   .bundle()
 *   .pipe(....);
 * ```
 *
 * @name commandify
 * @function
 * @param {string} file file whose content is to be transformed
 * @return {TransformStream} through stream 
 */
function (file) {
  if (!activator) activator = file;
  else if (activator !== file) return through();
  
  var data = '';
  return through(read, flush);
  
  function read(d, _, cb) { data += d; cb(); }
  function flush(cb) {
    var self = this;

    resolveCommand(file, function (err, res) {
      if (err) return cb(err);

      var dir = res.dir
        , cmd = res.cmd;

      executeCommand(cmd, dir, function (err) {
        if (err) return cb(err);
        
        self.push(data);
        cb();
      });
    });
  }
}

/**
 * The command to be executed (only needed if not defined via `package.json` config).
 * 
 * @name commandify::cmd
 */
exports.cmd = process.env.COMMANDIFY_CMD;

/**
 * The directory in which the command is to be executed (only needed if not defined via `package.json` config).
 * 
 * @name commandify::dir
 */
exports.dir = process.env.COMMANDIFY_DIR
