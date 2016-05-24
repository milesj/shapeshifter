'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Factory = require('./Factory');

var _Factory2 = _interopRequireDefault(_Factory);

var _isObject = require('./helpers/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schema = function () {
    function Schema(json) {
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
        } else if (!schema.fields || !Object.keys(schema.fields).length) {
            throw new Error('No fields found in schema.');
        }

        this.schema = schema;
        this.name = schema.name;
        this.fields = [];
        this.fieldNames = Object.keys(schema.fields);
    }

    _createClass(Schema, [{
        key: 'parse',
        value: function parse() {
            var _this = this;

            this.fields = this.fieldNames.map(function (field) {
                return _Factory2.default.definition(field, _this.schema.fields[field]);
            });

            return this;
        }
    }]);

    return Schema;
}();

exports.default = Schema;