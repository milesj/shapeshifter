'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _Factory = require('./Factory');

var _Factory2 = _interopRequireDefault(_Factory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schema =
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
  } else if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && data) {
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
  }

  this.schema = schema;
  this.name = schema.name;
  this.constants = schema.constants || [];
  this.imports = schema.imports || [];
  this.formats = schema.formats || [];

  // Convert attributes to definitions
  this.attributes = Object.keys(schema.attributes).map(function (attribute) {
    return _Factory2.default.definition(attribute, schema.attributes[attribute]);
  });
};

exports.default = Schema;