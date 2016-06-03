'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Renderer2 = require('../Renderer');

var _Renderer3 = _interopRequireDefault(_Renderer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactRenderer = function (_Renderer) {
  _inherits(ReactRenderer, _Renderer);

  function ReactRenderer() {
    _classCallCheck(this, ReactRenderer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ReactRenderer).apply(this, arguments));
  }

  _createClass(ReactRenderer, [{
    key: 'getHeader',

    /**
     * {@inheritdoc}
     */
    value: function getHeader() {
      return 'import { PropTypes } from \'react\';';
    }

    /**
     * {@inheritdoc}
     */

  }, {
    key: 'render',
    value: function render(setName) {
      var attributes = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      return 'export const ' + this.getSchemaName(setName) + ' = ' + this.renderShape({ attributes: attributes }, 0) + ';';
    }

    /**
     * Render a `React.PropType.arrayOf()` definition.
     *
     * @param {ArrayDefinition} definition
     * @param {Number} depth
     * @returns {String}
     */

  }, {
    key: 'renderArray',
    value: function renderArray(definition, depth) {
      return this.wrapPropType(definition, this.wrapFunction('arrayOf', this.renderAttribute(definition.valueType, depth)));
    }

    /**
     * Render a `React.PropType.bool` definition.
     *
     * @param {BoolDefinition} definition
     * @returns {String}
     */

  }, {
    key: 'renderBool',
    value: function renderBool(definition) {
      return this.wrapPropType(definition, 'bool');
    }

    /**
     * Render a `React.PropType.oneOf()` definition.
     *
     * @param {EnumDefinition} definition
     * @param {Number} depth
     * @returns {String}
     */

  }, {
    key: 'renderEnum',
    value: function renderEnum(definition, depth) {
      var _definition$config = definition.config;
      var values = _definition$config.values;
      var valueType = _definition$config.valueType;


      return this.wrapPropType(definition, this.wrapFunction('oneOf', this.formatArray(this.renderArrayItems(values, depth + 1, valueType), depth)));
    }

    /**
     * Render a `React.PropType.func` definition.
     *
     * @param {FuncDefinition} definition
     * @returns {String}
     */

  }, {
    key: 'renderFunc',
    value: function renderFunc(definition) {
      return this.wrapPropType(definition, 'func');
    }

    /**
     * Render a `React.PropType.instanceOf()` definition.
     *
     * @param {InstanceDefinition} definition
     * @returns {String}
     */

  }, {
    key: 'renderInstance',
    value: function renderInstance(definition) {
      var contract = definition.config.contract;


      return this.wrapPropType(definition, this.wrapFunction('instanceOf', this.formatValue(contract, 'function')));
    }

    /**
     * Render a `React.PropType.number` definition.
     *
     * @param {NumberDefinition} definition
     * @returns {String}
     */

  }, {
    key: 'renderNumber',
    value: function renderNumber(definition) {
      return this.wrapPropType(definition, 'number');
    }

    /**
     * Render a `React.PropType.arrayOf()` definition.
     *
     * @param {ObjectDefinition} definition
     * @param {Number} depth
     * @returns {String}
     */

  }, {
    key: 'renderObject',
    value: function renderObject(definition, depth) {
      return this.wrapPropType(definition, this.wrapFunction('objectOf', this.renderAttribute(definition.valueType, depth)));
    }

    /**
     * Render a `React.PropType.shape()` definition.
     *
     * @param {ShapeDefinition} definition
     * @param {Number} depth
     * @returns {String}
     */

  }, {
    key: 'renderShape',
    value: function renderShape(definition, depth) {
      return this.wrapPropType(definition, this.wrapFunction('shape', this.formatObject(this.renderObjectProps(definition.attributes, depth + 1), depth)));
    }

    /**
     * Render a `React.PropType.oneOfType()` definition.
     *
     * @param {UnionDefinition} definition
     * @param {Number} depth
     * @returns {String}
     */

  }, {
    key: 'renderUnion',
    value: function renderUnion(definition, depth) {
      return this.wrapPropType(definition, this.wrapFunction('oneOfType', this.formatArray(this.renderArrayItems(definition.valueTypes, depth + 1), depth)));
    }

    /**
     * Render a `React.PropType.string` definition.
     *
     * @param {StringDefinition} definition
     * @returns {String}
     */

  }, {
    key: 'renderString',
    value: function renderString(definition) {
      return this.wrapPropType(definition, 'string');
    }

    /**
     * Render a definition into an React PropType representation.
     *
     * @param {Definition|Object} definition
     * @param {String} template
     * @returns {String}
     */

  }, {
    key: 'wrapPropType',
    value: function wrapPropType(definition, template) {
      var response = 'PropTypes.' + template;

      if (definition.isRequired && definition.isRequired()) {
        response += '.isRequired';
      }

      return response;
    }
  }]);

  return ReactRenderer;
}(_Renderer3.default);

exports.default = ReactRenderer;