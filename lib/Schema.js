'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isObject = require('./helpers/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _isPrimitive = require('./helpers/isPrimitive');

var _isPrimitive2 = _interopRequireDefault(_isPrimitive);

var _isSupported = require('./helpers/isSupported');

var _isSupported2 = _interopRequireDefault(_isSupported);

var _Array = require('./definitions/Array');

var _Array2 = _interopRequireDefault(_Array);

var _Bool = require('./definitions/Bool');

var _Bool2 = _interopRequireDefault(_Bool);

var _Enum = require('./definitions/Enum');

var _Enum2 = _interopRequireDefault(_Enum);

var _Func = require('./definitions/Func');

var _Func2 = _interopRequireDefault(_Func);

var _Instance = require('./definitions/Instance');

var _Instance2 = _interopRequireDefault(_Instance);

var _Number = require('./definitions/Number');

var _Number2 = _interopRequireDefault(_Number);

var _Object = require('./definitions/Object');

var _Object2 = _interopRequireDefault(_Object);

var _Shape = require('./definitions/Shape');

var _Shape2 = _interopRequireDefault(_Shape);

var _String = require('./definitions/String');

var _String2 = _interopRequireDefault(_String);

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
            throw new SyntaxError('Parse requires a valid JSON structure.');
        }

        if (!schema.name) {
            throw new Error('No name found in schema.');
        } else if (!schema.fields || !Object.keys(schema.fields).length) {
            throw new Error('No fields found in schema.');
        }

        this.schema = schema;
        this.name = schema.name;
        this.fields = {};
        this.fieldNames = Object.keys(schema.fields);
    }

    _createClass(Schema, [{
        key: 'parse',
        value: function parse() {
            var schema = this.schema,
                fields = {};

            this.fieldNames.forEach(function (field) {
                var config = schema.fields[field],
                    definition = null;

                // Convert primitives to configuration objects
                if (typeof config === 'string') {
                    if ((0, _isPrimitive2.default)(config)) {
                        config = { type: config };
                    } else {
                        throw new TypeError('Invalid primitive type "' + config + '".');
                    }
                }

                // Check if a type exists
                if (!config.type || !(0, _isSupported2.default)(config.type)) {
                    throw new TypeError('Type "' + (config.type || 'unknown') + '" not supported.');
                }

                // Instantiate definition classes for each type
                switch (config.type) {
                    case 'array':
                        definition = new _Array2.default(config);
                        break;
                    case 'boolean':
                        definition = new _Bool2.default(config);
                        break;
                    case 'enum':
                        definition = new _Enum2.default(config);
                        break;
                    case 'function':
                        definition = new _Func2.default(config);
                        break;
                    case 'instance':
                        definition = new _Instance2.default(config);
                        break;
                    case 'number':
                        definition = new _Number2.default(config);
                        break;
                    case 'object':
                        definition = new _Object2.default(config);
                        break;
                    case 'shape':
                        definition = new _Shape2.default(config);
                        break;
                    case 'string':
                        definition = new _String2.default(config);
                        break;
                }

                fields[field] = definition;
            });

            return this.fields = fields;
        }
    }]);

    return Schema;
}();

exports.default = Schema;