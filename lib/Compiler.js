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

          var paths = [];

          files.forEach(function (file) {
            if (file.match(/\.(js|json)$/)) {
              paths = [].concat(_toConsumableArray(_this2.extractReferencePaths(_path2.default.join(folder, file))), _toConsumableArray(paths));
            }
          });

          resolve(paths);
        });
      });
    }

    /**
     * Compile a file by rendering the schema at the defined path.
     *
     * @param {String} file
     * @returns {Promise}
     */

  }, {
    key: 'compileFile',
    value: function compileFile(file) {
      return this.generateOutput(this.extractReferencePaths(file));
    }

    /**
     * Create a renderer with a schema found at the defined file path.
     *
     * @param {String} filePath
     * @returns {Renderer}
     */

  }, {
    key: 'createRenderer',
    value: function createRenderer(filePath) {
      // Use `require()` as it handles JSON and JS files easily
      return _Factory2.default.renderer(_config2.default.renderer, new _Schema2.default(require(filePath)));
    }

    /**
     * Extract a list of file paths based on references defined within the schema.
     *
     * @param {String} filePath
     * @returns {*[]}
     */

  }, {
    key: 'extractReferencePaths',
    value: function extractReferencePaths(filePath) {
      var basePath = _path2.default.dirname(filePath);
      var paths = [filePath];
      var schemas = [new _Schema2.default(require(filePath))];

      var _loop = function _loop() {
        var schema = schemas.shift();

        Object.keys(schema.references).forEach(function (ref) {
          var refPath = _path2.default.normalize(_path2.default.join(basePath, schema.references[ref]));

          if (refPath.match(/\.(js|json)$/)) {
            schemas.push(new _Schema2.default(require(refPath)));
            paths.unshift(refPath);
          }
        });
      };

      while (schemas.length) {
        _loop();
      }

      return paths;
    }

    /**
     * Generate the output by combining the header and body with the correct whitespace.
     *
     * @param {String[]} paths
     * @returns {Promise}
     */

  }, {
    key: 'generateOutput',
    value: function generateOutput(paths) {
      var _this3 = this;

      return new Promise(function (resolve) {
        var imports = new Set();
        var constants = new Set();
        var header = new Set();
        var sets = new Set();

        // Wrap in a set to remove duplicates
        new Set(paths).values().forEach(function (filePath) {
          var renderer = _this3.createRenderer(filePath);

          renderer.parse();

          imports = new Set([].concat(_toConsumableArray(imports.values()), _toConsumableArray(renderer.getImports())));
          constants = new Set([].concat(_toConsumableArray(constants.values()), _toConsumableArray(renderer.getConstants())));
          header = new Set([].concat(_toConsumableArray(header.values()), _toConsumableArray(renderer.getHeader())));
          sets = new Set([].concat(_toConsumableArray(sets.values()), _toConsumableArray(renderer.getSets())));
        });

        // Combine and filter the chunks
        var chunks = [];

        chunks.push(imports.values().join('\n'));
        chunks.push(constants.values().join('\n'));
        chunks.push(header.values().join('\n\n'));
        chunks.push(sets.values().join('\n\n'));

        resolve(chunks.filter(function (value) {
          return !!value;
        }).join('\n\n') + '\n');
      });
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