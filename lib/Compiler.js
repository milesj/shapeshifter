'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable no-console, global-require */

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _Factory = require('./Factory');

var _Factory2 = _interopRequireDefault(_Factory);

var _Schema = require('./Schema');

var _Schema2 = _interopRequireDefault(_Schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Compiler = function () {
  function Compiler(options) {
    _classCallCheck(this, Compiler);

    _config2.default.defaultNull = options.null;
    _config2.default.defaultRequired = options.required;
    _config2.default.indentCharacter = options.indent;
    _config2.default.renderer = options.renderer;
    _config2.default.schemaSuffix = options.suffix;
  }

  /**
   * Output the rendered schema to stdout.
   *
   * @param {String} value
   */


  _createClass(Compiler, [{
    key: 'compile',


    /**
     * Compile either a file or a folder by rendering each schema file.
     *
     * @param {String} target
     * @returns {Promise}
     */
    value: function compile(target) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _fs2.default.stat(target, function (error, stats) {
          if (error) {
            reject(error);
            return;
          }

          if (stats.isDirectory()) {
            resolve(_this.compileFolder(target));
          } else if (stats.isFile()) {
            resolve(_this.compileFile(target));
          } else {
            reject('Unsupported file type.');
          }
        });
      });
    }

    /**
     * Compile a folder by looping over all JS and JSON files and rendering them.
     *
     * @param {String} folder
     * @returns {Promise}
     */

  }, {
    key: 'compileFolder',
    value: function compileFolder(folder) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _fs2.default.readdir(folder, function (error, files) {
          if (error) {
            reject(error);
            return;
          }

          var output = [];

          files.forEach(function (file) {
            if (file.match(/\.(js|json)$/)) {
              output.push(_this2.compileFile(_path2.default.join(folder, file)));
            }
          });

          resolve(output.join('\n\n'));
        });
      });
    }

    /**
     * Compile a file by rendering the schema at the defined path.
     *
     * @param {String} file
     * @returns {String}
     */

  }, {
    key: 'compileFile',
    value: function compileFile(file) {
      // Use require() as it handles JSON and JS files easily
      return _Factory2.default.renderer(_config2.default.renderer, new _Schema2.default(require(file))).render();
    }
  }], [{
    key: 'output',
    value: function output(value) {
      console.log(value);
    }

    /**
     * Output any caught errors to stderr.
     *
     * @param {Error|String} error
     */

  }, {
    key: 'error',
    value: function error(_error) {
      var message = _error instanceof Error ? _error.message : _error;

      console.error(_chalk2.default.bgRed.white(message));
      process.exit(1);
    }
  }]);

  return Compiler;
}();

exports.default = Compiler;