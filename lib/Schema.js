'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Factory = require('./Factory');

var _Factory2 = _interopRequireDefault(_Factory);

var _isObject = require('./helpers/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schema = function Schema(json) {
    _classCallCheck(this, Schema);

    var schema = {};

    if (typeof json === 'string') {
        schema = JSON.parse(json);
    } else if ((0, _isObject2.default)(json)) {
        schema = json;
    } else {
        throw new SyntaxError('Schema requires a valid JSON structure.');
    }

    if (!schema.name) {
        throw new Error('No name found in schema.');
    } else if (!schema.attributes || !Object.keys(schema.attributes).length) {
        throw new Error('No attributes found in schema.');
    }

    this.schema = schema;
    this.name = schema.name;
    this.constants = schema.constants || [];
    this.formats = schema.formats || [];
    this.attributes = Object.keys(schema.attributes).map(function (attribute) {
        return _Factory2.default.definition(attribute, schema.attributes[attribute]);
    });

    return this;
};

exports.default = Schema;