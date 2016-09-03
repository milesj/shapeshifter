'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright   2016, Miles Johnson
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license     https://opensource.org/licenses/MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _Factory = require('./Factory');

var _Factory2 = _interopRequireDefault(_Factory);

var _isObject = require('./helpers/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SchemaReader = function () {
  /**
   * Load and parse a schema, either as a JSON string, or as a JS object.
   *
   * @param {String} filePath
   * @param {String|Object} data
   */
  function SchemaReader(filePath, data) {
    _classCallCheck(this, SchemaReader);

    this.path = filePath;
    this.name = _path2.default.basename(filePath);
    this.attributes = {};
    this.constants = {};
    this.imports = [];
    this.subsets = {};
    this.references = {};
    this.referenceSchemas = {};

    if (typeof data === 'string') {
      this.schema = JSON.parse(data);
    } else if ((0, _isObject2.default)(data)) {
      this.schema = data;
    } else {
      this.throwError('Schema requires a valid JSON structure.');
    }

    this.setup();
  }

  /**
   * Throw an error prefixed with the schema name.
   *
   * @param {String} error
   */


  _createClass(SchemaReader, [{
    key: 'throwError',
    value: function throwError(error) {
      throw new SyntaxError('[' + this.name + '] ' + error);
    }

    /**
     * Setup the state of the schema.
     */

  }, {
    key: 'setup',
    value: function setup() {
      var data = this.schema;

      this.setName(data.name);
      this.setAttributes(data.attributes);

      if ('constants' in data) {
        this.setConstants(data.constants);
      }

      if ('imports' in data) {
        this.setImports(data.imports);
      }

      if ('references' in data) {
        this.setReferences(data.references);
      }

      if ('subsets' in data) {
        this.setSubsets(data.subsets);
      }
    }

    /**
     * Set schema attributes.
     *
     * @param {Object} attributes
     */

  }, {
    key: 'setAttributes',
    value: function setAttributes(attributes) {
      if (!(0, _isObject2.default)(attributes) || !Object.keys(attributes).length) {
        this.throwError('No attributes found in schema.');
      }

      // Convert to type definitions
      this.attributes = Object.keys(attributes).map(function (attribute) {
        return _Factory2.default.definition(attribute, attributes[attribute]);
      });
    }

    /**
     * Set schema constants.
     *
     * @param {Object} constants
     */

  }, {
    key: 'setConstants',
    value: function setConstants(constants) {
      if (!(0, _isObject2.default)(constants)) {
        this.throwError('Schema constants must be an object that maps to primitive values.');
      }

      this.constants = constants;
    }

    /**
     * Set schema imports.
     *
     * @param {Object[]} imports
     */

  }, {
    key: 'setImports',
    value: function setImports(imports) {
      if (!Array.isArray(imports)) {
        this.throwError('Schema imports must be an array of import declarations.');
      }

      this.imports = imports;
    }

    /**
     * Set the name of the schema.
     *
     * @param {String} name
     */

  }, {
    key: 'setName',
    value: function setName(name) {
      if (!name || typeof name !== 'string') {
        this.throwError('No name found in schema.');
      }

      this.name = name;
    }

    /**
     * Set reference schemas.
     *
     * @param {Object} references
     */

  }, {
    key: 'setReferences',
    value: function setReferences(references) {
      if (!(0, _isObject2.default)(references)) {
        this.throwError('Schema references must be an object that maps to other schemas.');
      }

      this.references = references;
    }

    /**
     * Set subsets of the schema.
     *
     * @param {Object} subsets
     */

  }, {
    key: 'setSubsets',
    value: function setSubsets(subsets) {
      if (!(0, _isObject2.default)(subsets)) {
        this.throwError('Schema subsets must be an object.');
      }

      this.subsets = subsets;
    }
  }]);

  return SchemaReader;
}();

exports.default = SchemaReader;