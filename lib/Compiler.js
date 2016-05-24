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
        key: 'compileField',
        value: function compileField(definition) {
            if (definition instanceof _Array2.default) {
                return this.renderArray(definition);
            } else if (definition instanceof _Bool2.default) {
                return this.renderBool(definition);
            } else if (definition instanceof _Enum2.default) {
                return this.renderEnum(definition);
            } else if (definition instanceof _Func2.default) {
                return this.renderFunc(definition);
            } else if (definition instanceof _Instance2.default) {
                return this.renderInstance(definition);
            } else if (definition instanceof _Number2.default) {
                return this.renderNumber(definition);
            } else if (definition instanceof _Object2.default) {
                return this.renderObject(definition);
            } else if (definition instanceof _String2.default) {
                return this.renderString(definition);
            }
        }
    }, {
        key: 'formatArray',
        value: function formatArray(array, type) {
            var _this = this;

            return '[' + array.map(function (value) {
                return _this.formatValue(value, type);
            }).join(', ') + ']';
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