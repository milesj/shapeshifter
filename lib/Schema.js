'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _Factory = require('./Factory');

var _Factory2 = _interopRequireDefault(_Factory);

var _isObject = require('./helpers/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @copyright   2016, Miles Johnson
                                                                                                                                                           * @license     https://opensource.org/licenses/MIT
                                                                                                                                                           */

var Schema =
/**
 * Load and parse a schema, either as a JSON string, or as a JS object.
 *
 * @param {String} filePath
 * @param {String|Object} data
 */
function Schema(filePath, data) {
  _classCallCheck(this, Schema);

  var fileName = _path2.default.basename(filePath);
  var schema = {};
  var error = '';

  if (typeof data === 'string') {
    schema = JSON.parse(data);
  } else if ((0, _isObject2.default)(data)) {
    schema = data;
  } else {
    throw new SyntaxError('[' + fileName + '] Schema requires a valid JSON structure.');
  }

  if (!schema.name) {
    error = 'No name found in schema.';
  } else if (!(0, _isObject2.default)(schema.attributes) || !Object.keys(schema.attributes).length) {
    error = 'No attributes found in schema.';
  } else if ('imports' in schema && !Array.isArray(schema.imports)) {
    error = 'Schema imports must be an array of import declarations.';
  } else if ('constants' in schema && !(0, _isObject2.default)(schema.constants)) {
    error = 'Schema constants must be an object that maps to primitive values.';
  } else if ('subsets' in schema && !(0, _isObject2.default)(schema.subsets)) {
    error = 'Schema subsets must be an object.';
  } else if ('references' in schema && !(0, _isObject2.default)(schema.references)) {
    error = 'Schema references must be an object that maps to other schemas.';
  }

  if (error) {
    throw new SyntaxError('[' + fileName + '] ' + error);
  }

  this.schema = schema;
  this.path = filePath;
  this.name = schema.name;
  this.constants = schema.constants || {};
  this.imports = schema.imports || [];
  this.subsets = schema.subsets || {};
  this.references = schema.references || {};
  this.referenceSchemas = {};

  // Convert attributes to definitions
  this.attributes = Object.keys(schema.attributes).map(function (attribute) {
    return _Factory2.default.definition(attribute, schema.attributes[attribute]);
  });
};

exports.default = Schema;