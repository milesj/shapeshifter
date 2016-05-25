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

var _indent = require('./helpers/indent');

var _indent2 = _interopRequireDefault(_indent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Compiler = function () {
    function Compiler(schema) {
        _classCallCheck(this, Compiler);

        this.schema = schema;
    }

    _createClass(Compiler, [{
        key: 'compileAttribute',
        value: function compileAttribute(definition) {
            var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

            if (definition instanceof _Array2.default) {
                return this.renderArray(definition, depth);
            } else if (definition instanceof _Bool2.default) {
                return this.renderBool(definition, depth);
            } else if (definition instanceof _Enum2.default) {
                return this.renderEnum(definition, depth);
            } else if (definition instanceof _Func2.default) {
                return this.renderFunc(definition, depth);
            } else if (definition instanceof _Instance2.default) {
                return this.renderInstance(definition, depth);
            } else if (definition instanceof _Number2.default) {
                return this.renderNumber(definition, depth);
            } else if (definition instanceof _Object2.default) {
                return this.renderObject(definition, depth);
            } else if (definition instanceof _Shape2.default) {
                return this.renderShape(definition, depth);
            } else if (definition instanceof _String2.default) {
                return this.renderString(definition, depth);
            }
        }
    }, {
        key: 'compileArrayItems',
        value: function compileArrayItems(items, valueType) {
            var _this = this;

            var depth = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

            return items.map(function (item) {
                return (0, _indent2.default)(depth) + _this.wrapItem(_this.formatValue(item, valueType));
            });
        }
    }, {
        key: 'compileObjectProps',
        value: function compileObjectProps(attributes) {
            var _this2 = this;

            var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

            return attributes.map(function (definition) {
                return (0, _indent2.default)(depth) + _this2.wrapProperty(definition.attribute, _this2.compileAttribute(definition, depth));
            });
        }
    }, {
        key: 'formatArray',
        value: function formatArray(items, depth) {
            if (Array.isArray(items)) {
                items = items.join('\n');
            }

            return '[\n' + items + '\n' + (0, _indent2.default)(depth) + ']';
        }
    }, {
        key: 'formatObject',
        value: function formatObject(props, depth) {
            if (Array.isArray(props)) {
                props = props.join('\n');
            }

            return '{\n' + props + '\n' + (0, _indent2.default)(depth) + '}';
        }
    }, {
        key: 'formatValue',
        value: function formatValue(value, type) {
            switch (type || (typeof value === 'undefined' ? 'undefined' : _typeof(value))) {
                case 'string':
                    return '\'' + value + '\'';

                case 'function':
                case 'boolean':
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