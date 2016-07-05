'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright   2016, Miles Johnson
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license     https://opensource.org/licenses/MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

/* eslint-disable no-console, global-require */

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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Compiler = function () {
  function Compiler(options) {
    _classCallCheck(this, Compiler);

    _config2.default.defaultNull = options.defaultNull;
    _config2.default.defaultRequired = options.defaultRequired;
    _config2.default.indentCharacter = options.indentCharacter;
    _config2.default.renderer = options.renderer;
    _config2.default.schemaSuffix = options.schemaSuffix;
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

          // Use sets so that duplicates are removed
          var imports = new Set();
          var constants = new Set();
          var header = new Set();
          var sets = new Set();

          files.forEach(function (file) {
            if (file.match(/\.(js|json)$/)) {
              var renderer = _this2.createRenderer(_path2.default.join(folder, file));

              renderer.parse();

              imports = new Set([].concat(_toConsumableArray(imports.values()), _toConsumableArray(renderer.getImports())));
              constants = new Set([].concat(_toConsumableArray(constants.values()), _toConsumableArray(renderer.getConstants())));
              header = new Set([].concat(_toConsumableArray(header.values()), _toConsumableArray(renderer.getHeader())));
              sets = new Set([].concat(_toConsumableArray(sets.values()), _toConsumableArray(renderer.getSets())));
            }
          });

          resolve(_this2.generateOutput(Array.from(imports.values()), Array.from(constants.values()), Array.from(header.values()), Array.from(sets.values())));
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
      var renderer = this.createRenderer(file);

      renderer.parse();

      return this.generateOutput(renderer.getImports(), renderer.getConstants(), renderer.getHeader(), renderer.getSets());
    }

    /**
     * Create a renderer with a schema found at the defined file path.
     *
     * @param {String} [file]
     * @returns {Renderer}
     */

  }, {
    key: 'createRenderer',
    value: function createRenderer(file) {
      // Use `require()` as it handles JSON and JS files easily
      return _Factory2.default.renderer(_config2.default.renderer, file ? new _Schema2.default(require(file)) : null);
    }

    /**
     * Generate the output by combining the header and body with the correct whitespace.
     *
     * @param {String[]} imports
     * @param {String[]} constants
     * @param {String[]} header
     * @param {String[]} body
     * @returns {string}
     */

  }, {
    key: 'generateOutput',
    value: function generateOutput(imports, constants, header, body) {
      var chunks = [];

      chunks.push(imports.join('\n'));
      chunks.push(constants.join('\n'));
      chunks.push(header.join('\n\n'));
      chunks.push(body.join('\n\n'));

      return chunks.filter(function (value) {
        return !!value;
      }).join('\n\n') + '\n';
    }
  }], [{
    key: 'output',
    value: function output(value) {
      console.log(value);
      process.exit(0);
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