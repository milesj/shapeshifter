'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Factory = require('./Factory');

var _Factory2 = _interopRequireDefault(_Factory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schema = function () {
  /**
   * Load and parse a schema, either as a JSON string, or as a JS object.
   *
   * @param {String|Object} data
   */

  function Schema(data) {
    _classCallCheck(this, Schema);

    var schema = {};

    if (typeof data === 'string') {
      schema = JSON.parse(data);
    } else if (this.isObject(data)) {
      schema = data;
    } else {
      throw new SyntaxError('Schema requires a valid JSON structure.');
    }

    if (!schema.name) {
      throw new SyntaxError('No name found in schema.');
    } else if (!schema.attributes || !Object.keys(schema.attributes).length) {
      throw new SyntaxError('No attributes found in schema.');
    } else if (schema.imports && !Array.isArray(schema.imports)) {
      throw new SyntaxError('Schema imports must be an array of import declarations.');
    } else if (schema.constants && !this.isObject(schema.constants)) {
      throw new SyntaxError('Schema constants must be an object that maps to primitive values.');
    }

    this.schema = schema;
    this.name = schema.name;
    this.constants = schema.constants || {};
    this.imports = schema.imports || [];
    this.formats = schema.formats || [];

    // Convert attributes to definitions
    this.attributes = Object.keys(schema.attributes).map(function (attribute) {
      return _Factory2.default.definition(attribute, schema.attributes[attribute]);
    });
  }

  /**
   * Return true if the value is an object.
   *
   * @param {*} value
   * @returns {Boolean}
   */


  _createClass(Schema, [{
    key: 'isObject',
    value: function isObject(value) {
      return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value;
    }
  }]);

  return Schema;
}();

exports.default = Schema;