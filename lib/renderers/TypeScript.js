'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Renderer2 = require('../Renderer');

var _Renderer3 = _interopRequireDefault(_Renderer2);

var _Func = require('../definitions/Func');

var _Func2 = _interopRequireDefault(_Func);

var _indent = require('../helpers/indent');

var _indent2 = _interopRequireDefault(_indent);

var _formatName = require('../helpers/formatName');

var _formatName2 = _interopRequireDefault(_formatName);

var _isPrimitive = require('../helpers/isPrimitive');

var _isPrimitive2 = _interopRequireDefault(_isPrimitive);

var _normalizeType = require('../helpers/normalizeType');

var _normalizeType2 = _interopRequireDefault(_normalizeType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright   2016, Miles Johnson
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license     https://opensource.org/licenses/MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var TypeScriptRenderer = function (_Renderer) {
  _inherits(TypeScriptRenderer, _Renderer);

  function TypeScriptRenderer() {
    _classCallCheck(this, TypeScriptRenderer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TypeScriptRenderer).apply(this, arguments));
  }

  _createClass(TypeScriptRenderer, [{
    key: 'render',

    /**
     * {@inheritDoc}
     */
    value: function render(setName) {
      var attributes = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      return 'export interface ' + this.getSchemaName(setName) + ' ' + this.renderShape({ attributes: attributes }, 0);
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderArray',
    value: function renderArray(definition, depth) {
      var configType = definition.valueType.config.type;
      var template = this.renderAttribute(definition.valueType, depth);

      if ((0, _isPrimitive2.default)(configType) || configType === 'instance') {
        template += '[]';
      } else {
        template = this.wrapGenerics('Array', template);
      }

      return template;
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderBool',
    value: function renderBool() {
      return 'boolean';
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderEnum',
    value: function renderEnum(definition) {
      var _definition$config = definition.config;
      var values = _definition$config.values;
      var valueType = _definition$config.valueType;

      var members = [];
      var enumName = [this.schema.name, definition.attribute, 'Enum'].map(_formatName2.default).join('');

      var currentIndex = 0;
      var currentChar = 65;

      switch ((0, _normalizeType2.default)(valueType)) {
        // If a string is provided
        // Assign values incrementally starting from 0
        case 'string':
          values.forEach(function (value) {
            members.push('' + (0, _indent2.default)(1) + value + ' = ' + currentIndex);
            currentIndex++;
          });
          break;

        // If a number or boolean is provided
        // Generate unique keys using the alphabet
        case 'number':
        case 'boolean':
          values.forEach(function (value) {
            members.push('' + (0, _indent2.default)(1) + String.fromCodePoint(currentChar) + ' = ' + Number(value));
            currentChar++;
          });
          break;

        default:
          break;
      }

      this.header.push('export enum ' + enumName + ' ' + this.formatObject(members, 0, ',\n'));

      return enumName;
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderFunc',
    value: function renderFunc(definition, depth) {
      var returnType = definition.returnType ? this.renderAttribute(definition.returnType, depth + 1) : 'void';

      var argTypes = definition.argTypes
      // eslint-disable-next-line newline-per-chained-call
      ? this.renderObjectProps(definition.argTypes).join(' ').replace(/,$/, '') : '';

      return '(' + argTypes + ') => ' + returnType;
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderInstance',
    value: function renderInstance(definition) {
      return this.formatValue(definition.config.contract, 'function');
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderNumber',
    value: function renderNumber() {
      return 'number';
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderObject',
    value: function renderObject(definition, depth) {
      var key = this.renderAttribute(definition.keyType, depth);
      var value = this.renderAttribute(definition.valueType, depth);

      return this.formatObject('[key: ' + key + ']: ' + value, 0, ' ', ' ');
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderShape',
    value: function renderShape(definition, depth) {
      return this.formatObject(this.renderObjectProps(definition.attributes, depth + 1, ';'), depth);
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderUnion',
    value: function renderUnion(definition, depth) {
      var _this2 = this;

      return definition.valueTypes.map(function (item) {
        var value = _this2.renderAttribute(item, depth);

        // Functions need to be wrapped in parenthesis when used in unions
        return item instanceof _Func2.default ? '(' + value + ')' : value;
      }).join(' | ');
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderString',
    value: function renderString() {
      return 'string';
    }

    /**
     * Mark as optional.
     *
     * @param {Definition} definition
     * @returns {String}
     */

  }, {
    key: 'wrapPropertyName',
    value: function wrapPropertyName(definition) {
      var template = definition.attribute;

      if (!definition.isRequired()) {
        return template + '?';
      }

      return template;
    }
  }]);

  return TypeScriptRenderer;
}(_Renderer3.default);

exports.default = TypeScriptRenderer;