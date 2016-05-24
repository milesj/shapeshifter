'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SUPPORTED_TYPES = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Definition2 = require('../Definition');

var _Definition3 = _interopRequireDefault(_Definition2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SUPPORTED_TYPES = exports.SUPPORTED_TYPES = ['number', 'string', 'function'];

var Enum = function (_Definition) {
    _inherits(Enum, _Definition);

    function Enum() {
        _classCallCheck(this, Enum);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Enum).apply(this, arguments));
    }

    _createClass(Enum, [{
        key: 'validateConfig',
        value: function validateConfig() {
            var _this2 = this;

            _get(Object.getPrototypeOf(Enum.prototype), 'validateConfig', this).call(this);

            var config = this.config;

            if (!config.valueType || SUPPORTED_TYPES.indexOf(config.valueType) === -1) {
                throw new TypeError('Enumerable value type "' + (config.valueType || 'unknown') + '" not supported.');
            }

            if (!Array.isArray(config.values)) {
                throw new TypeError('Enumerable values must be an array.');
            } else if (!config.values.every(function (value) {
                return _this2.validateValue(value);
            })) {
                throw new TypeError('Enumerable values do not match the defined value type.');
            }
        }

        // TODO - support non-primitive values

    }, {
        key: 'validateValue',
        value: function validateValue(value) {
            var valueType = this.config.valueType;

            // Function names are defined as string within the schema
            if (valueType === 'function') {
                valueType = 'string';
            }

            return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === valueType;
        }
    }]);

    return Enum;
}(_Definition3.default);

exports.default = Enum;