'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

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

var Compiler = function () {
    function Compiler(schema) {
        _classCallCheck(this, Compiler);

        this.schema = schema;
    }

    _createClass(Compiler, [{
        key: 'compileFields',
        value: function compileFields(fields) {
            var _this = this;

            var compiledFields = [];

            Object.keys(fields).forEach(function (field) {
                var definition = fields[field],
                    compiledField = void 0;

                if (definition instanceof _Bool2.default) {
                    compiledField = _this.renderBool(field, definition);
                } else if (definition instanceof _Enum2.default) {
                    compiledField = _this.renderEnum(field, definition);
                } else if (definition instanceof _Func2.default) {
                    compiledField = _this.renderFunc(field, definition);
                } else if (definition instanceof _Instance2.default) {
                    compiledField = _this.renderInstance(field, definition);
                } else if (definition instanceof _Number2.default) {
                    compiledField = _this.renderNumber(field, definition);
                } else if (definition instanceof _String2.default) {
                    compiledField = _this.renderString(field, definition);
                }

                compiledFields.push(compiledField);
            });

            return compiledFields;
        }
    }, {
        key: 'formatArray',
        value: function formatArray(values, type) {
            var _this2 = this;

            var array = values.map(function (value) {
                return _this2.formatValue(value, type);
            }).join(', ');

            return '[' + array + ']';
        }
    }, {
        key: 'formatValue',
        value: function formatValue(value, type) {
            switch (type || (typeof value === 'undefined' ? 'undefined' : _typeof(value))) {
                case 'string':
                    return '\'' + value + '\'';
                case 'function':
                    return '' + value;
                case 'number':
                    return parseFloat(value);
                default:
                    throw new TypeError('Unknown type passed to `formatValue()`.');
            }
        }
    }, {
        key: 'getResourceName',
        value: function getResourceName() {
            var subResource = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

            return this.schema.name + subResource + _config2.default.schemaSuffix;
        }
    }]);

    return Compiler;
}();

exports.default = Compiler;