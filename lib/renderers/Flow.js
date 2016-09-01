'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Renderer2 = require('../Renderer');

var _Renderer3 = _interopRequireDefault(_Renderer2);

var _isPrimitive = require('../helpers/isPrimitive');

var _isPrimitive2 = _interopRequireDefault(_isPrimitive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright   2016, Miles Johnson
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license     https://opensource.org/licenses/MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var FlowRenderer = function (_Renderer) {
  _inherits(FlowRenderer, _Renderer);

  function FlowRenderer() {
    _classCallCheck(this, FlowRenderer);

    return _possibleConstructorReturn(this, (FlowRenderer.__proto__ || Object.getPrototypeOf(FlowRenderer)).apply(this, arguments));
  }

  _createClass(FlowRenderer, [{
    key: 'beforeParse',

    /**
     * {@inheritDoc}
     */
    value: function beforeParse() {
      this.imports.push('// @flow');
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'render',
    value: function render(setName) {
      var attributes = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      return 'export type ' + this.getSchemaName(setName) + ' = ' + this.renderShape({ attributes: attributes }, 0) + ';';
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

      return this.wrapNullable(definition, template);
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderBool',
    value: function renderBool(definition) {
      return this.wrapNullable(definition, 'boolean');
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderEnum',
    value: function renderEnum(definition, depth) {
      var _this2 = this;

      var _definition$config = definition.config;
      var values = _definition$config.values;
      var valueType = _definition$config.valueType;


      return values.map(function (item) {
        return _this2.renderOrFormat(item, depth, valueType);
      }).join(' | ');
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
      ? this.renderObjectProps(definition.argTypes).join(' ').trim().replace(/,$/, '') : '';

      return this.wrapNullable(definition, '(' + argTypes + ') => ' + returnType);
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderInstance',
    value: function renderInstance(definition) {
      return this.wrapNullable(definition, this.formatValue(definition.config.contract, 'function'));
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderNumber',
    value: function renderNumber(definition) {
      return this.wrapNullable(definition, 'number');
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderObject',
    value: function renderObject(definition, depth) {
      var key = this.renderAttribute(definition.keyType, depth);
      var value = this.renderAttribute(definition.valueType, depth);

      return this.wrapNullable(definition, this.formatObject('[key: ' + key + ']: ' + value, 0, ' ', ' '));
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderReference',
    value: function renderReference(definition) {
      return this.wrapNullable(definition, _get(FlowRenderer.prototype.__proto__ || Object.getPrototypeOf(FlowRenderer.prototype), 'renderReference', this).call(this, definition));
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderShape',
    value: function renderShape(definition, depth) {
      return this.wrapNullable(definition, this.formatObject(this.renderObjectProps(definition.attributes, depth + 1), depth));
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderUnion',
    value: function renderUnion(definition, depth) {
      var _this3 = this;

      return definition.valueTypes.map(function (item) {
        return _this3.renderAttribute(item, depth);
      }).join(' | ');
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderString',
    value: function renderString(definition) {
      return this.wrapNullable(definition, 'string');
    }

    /**
     * Render a definition and wrap for Flow nullable support.
     *
     * @param {Definition|Object} definition
     * @param {String} template
     * @returns {String}
     */

  }, {
    key: 'wrapNullable',
    value: function wrapNullable(definition, template) {
      if (definition.isNullable && definition.isNullable()) {
        return '?' + template;
      }

      return template;
    }
  }]);

  return FlowRenderer;
}(_Renderer3.default);

exports.default = FlowRenderer;