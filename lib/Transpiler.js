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

var _Factory = require('./Factory');

var _Factory2 = _interopRequireDefault(_Factory);

var _SchemaReader = require('./SchemaReader');

var _SchemaReader2 = _interopRequireDefault(_SchemaReader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Transpiler = function () {
  function Transpiler(options) {
    _classCallCheck(this, Transpiler);

    this.options = options;
  }

  /**
   * Output the rendered schema to stdout.
   *
   * @param {String} value
   */


  _createClass(Transpiler, [{
    key: 'transpile',


    /**
     * Transpile either a file or a folder by rendering each schema file.
     *
     * @param {String} target
     * @returns {Promise}
     */
    value: function transpile(target) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _fs2.default.stat(target, function (error, stats) {
          if (error) {
            reject(error);
            return;
          }

          if (stats.isDirectory()) {
            resolve(_this.transpileFolder(target));
          } else if (stats.isFile()) {
            resolve(_this.transpileFile(target));
          } else {
            reject('Unsupported file type.');
          }
        });
      });
    }

    /**
     * Transpile a folder by looping over all JS and JSON files and rendering them.
     *
     * @param {String} folderPath
     * @returns {Promise}
     */

  }, {
    key: 'transpileFolder',
    value: function transpileFolder(folderPath) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _fs2.default.readdir(folderPath, function (error, filePaths) {
          if (error) {
            reject(error);
            return;
          }

          var schemas = [];

          filePaths.forEach(function (filePath) {
            if (filePath.match(/\.(js|json)$/)) {
              schemas = [].concat(_toConsumableArray(schemas), _toConsumableArray(_this2.extractSchemas(_path2.default.join(folderPath, filePath))));
            }
          });

          resolve(_this2.generateOutput(schemas));
        });
      });
    }

    /**
     * Transpile a file by rendering the schema at the defined path.
     *
     * @param {String} file
     * @returns {Promise}
     */

  }, {
    key: 'transpileFile',
    value: function transpileFile(file) {
      return this.generateOutput(this.extractSchemas(file));
    }

    /**
     * Extract a list of file paths based on references defined within the schema.
     *
     * @param {String} filePath
     * @returns {SchemaReader[]}
     */

  }, {
    key: 'extractSchemas',
    value: function extractSchemas(filePath) {
      var _this3 = this;

      var basePath = _path2.default.dirname(filePath);
      var toResolve = [{ resolvePath: filePath }];
      var schemas = [];

      // Use `require()` as it handles JSON and JS files easily

      var _loop = function _loop() {
        var _toResolve$shift = toResolve.shift();

        var resolvePath = _toResolve$shift.resolvePath;
        var parentSchema = _toResolve$shift.parentSchema;
        var refKey = _toResolve$shift.refKey;

        // Only support JS and JSON

        if (!resolvePath.match(/\.(js|json)$/)) {
          // eslint-disable-next-line no-continue
          return 'continue';
        }

        var schema = new _SchemaReader2.default(resolvePath, require(resolvePath), _this3.options);

        schemas.unshift(schema);

        // Assign to parent
        if (parentSchema && refKey) {
          parentSchema.referenceSchemas[refKey] = schema;
        }

        // Extract child references
        Object.keys(schema.references).forEach(function (ref) {
          toResolve.push({
            resolvePath: _path2.default.normalize(_path2.default.join(basePath, schema.references[ref])),
            parentSchema: schema,
            refKey: ref
          });
        });
      };

      while (toResolve.length) {
        var _ret = _loop();

        if (_ret === 'continue') continue;
      }

      return schemas;
    }

    /**
     * Generate the output by combining all schemas into a single output.
     *
     * @param {SchemaReader[]} schemas
     * @returns {Promise}
     */

  }, {
    key: 'generateOutput',
    value: function generateOutput(schemas) {
      var _this4 = this;

      return new Promise(function (resolve) {
        var rendered = new Set();
        var imports = new Set();
        var constants = new Set();
        var header = new Set();
        var sets = new Set();

        // Wrap in a set to remove duplicates
        schemas.forEach(function (schema) {
          if (rendered.has(schema.path)) {
            return;
          }

          var renderer = _Factory2.default.renderer(_this4.options, schema);

          renderer.parse();

          imports = new Set([].concat(_toConsumableArray(imports.values()), _toConsumableArray(renderer.getImports())));
          constants = new Set([].concat(_toConsumableArray(constants.values()), _toConsumableArray(renderer.getConstants())));
          header = new Set([].concat(_toConsumableArray(header.values()), _toConsumableArray(renderer.getHeader())));
          sets = new Set([].concat(_toConsumableArray(sets.values()), _toConsumableArray(renderer.getSets())));
          rendered.add(schema.path);
        });

        // Combine and filter the chunks
        var chunks = [];

        chunks.push(Array.from(imports.values()).join('\n'));
        chunks.push(Array.from(constants.values()).join('\n'));
        chunks.push(Array.from(header.values()).join('\n\n'));
        chunks.push(Array.from(sets.values()).join('\n\n'));

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

  return Transpiler;
}();

exports.default = Transpiler;