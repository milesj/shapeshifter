'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Definition2 = require('../Definition');

var _Definition3 = _interopRequireDefault(_Definition2);

var _isPrimitive = require('../helpers/isPrimitive');

var _isPrimitive2 = _interopRequireDefault(_isPrimitive);

var _normalizeType = require('../helpers/normalizeType');

var _normalizeType2 = _interopRequireDefault(_normalizeType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EnumDefinition = function (_Definition) {
  _inherits(EnumDefinition, _Definition);

  function EnumDefinition() {
    _classCallCheck(this, EnumDefinition);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(EnumDefinition).apply(this, arguments));
  }

  _createClass(EnumDefinition, [{
    key: 'validateConfig',

    /**
     * {@inheritDoc}
     */
    value: function validateConfig() {
      var _this2 = this;

      _get(Object.getPrototypeOf(EnumDefinition.prototype), 'validateConfig', this).call(this);

      var _config = this.config;
      var values = _config.values;
      var valueType = _config.valueType;


      if (!valueType) {
        throw new SyntaxError('Enum definitions require a "valueType" property.');
      } else if (!(0, _isPrimitive2.default)(valueType)) {
        throw new TypeError('Enum value type "' + (valueType || 'unknown') + '" not supported.');
      } else if (!Array.isArray(values) || !values.length) {
        throw new TypeError('Enum values must be a non-empty array.');
      } else if (!values.every(function (value) {
        return _this2.validateValue(value);
      })) {
        throw new TypeError('Enum values do not match the defined value type.');
      }
    }

    /**
     * Validate a value matches the type in `valueType`.
     *
     * @param {*} value
     * @returns {Boolean}
     */

  }, {
    key: 'validateValue',
    value: function validateValue(value) {
      var valueType = (0, _normalizeType2.default)(this.config.valueType);

      // Function names are defined as strings within the schema
      if (valueType === 'function') {
        valueType = 'string';
      }

      return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === valueType;
    }
  }]);

  return EnumDefinition;
}(_Definition3.default);

exports.default = EnumDefinition;