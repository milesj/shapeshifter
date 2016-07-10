'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Renderer2 = require('../Renderer');

var _Renderer3 = _interopRequireDefault(_Renderer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright   2016, Miles Johnson
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license     https://opensource.org/licenses/MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ReactRenderer = function (_Renderer) {
  _inherits(ReactRenderer, _Renderer);

  function ReactRenderer() {
    _classCallCheck(this, ReactRenderer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ReactRenderer).apply(this, arguments));
  }

  _createClass(ReactRenderer, [{
    key: 'beforeParse',

    /**
     * {@inheritDoc}
     */
    value: function beforeParse() {
      this.imports.push('import { PropTypes } from \'react\';');
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'render',
    value: function render(setName) {
      var attributes = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      return 'export const ' + this.getSchemaName(setName) + ' = ' + this.renderShape({ attributes: attributes }, 0) + ';';
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderArray',
    value: function renderArray(definition, depth) {
      return this.wrapPropType(definition, this.wrapFunction('arrayOf', this.renderAttribute(definition.valueType, depth)));
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderBool',
    value: function renderBool(definition) {
      return this.wrapPropType(definition, 'bool');
    }

    /**
     * {@inheritDoc}
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
     * {@inheritDoc}
     */

  }, {
    key: 'renderFunc',
    value: function renderFunc(definition) {
      return this.wrapPropType(definition, 'func');
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderInstance',
    value: function renderInstance(definition) {
      var contract = definition.config.contract;


      return this.wrapPropType(definition, this.wrapFunction('instanceOf', this.formatValue(contract, 'function')));
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderNumber',
    value: function renderNumber(definition) {
      return this.wrapPropType(definition, 'number');
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderObject',
    value: function renderObject(definition, depth) {
      return this.wrapPropType(definition, this.wrapFunction('objectOf', this.renderAttribute(definition.valueType, depth)));
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderReference',
    value: function renderReference(definition) {
      return this.wrapRequired(definition, _get(Object.getPrototypeOf(ReactRenderer.prototype), 'renderReference', this).call(this, definition));
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderShape',
    value: function renderShape(definition, depth) {
      return this.wrapPropType(definition, this.wrapFunction('shape', this.formatObject(this.renderObjectProps(definition.attributes, depth + 1), depth)));
    }

    /**
     * {@inheritDoc}
     */

  }, {
    key: 'renderUnion',
    value: function renderUnion(definition, depth) {
      return this.wrapPropType(definition, this.wrapFunction('oneOfType', this.formatArray(this.renderArrayItems(definition.valueTypes, depth + 1), depth)));
    }

    /**
     * {@inheritDoc}
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
      return this.wrapRequired(definition, 'PropTypes.' + template);
    }

    /**
     * Wrap a definition template with required if applicable.
     *
     * @param {Definition|Object} definition
     * @param {String} template
     * @returns {String}
     */

  }, {
    key: 'wrapRequired',
    value: function wrapRequired(definition, template) {
      if (definition.isRequired && definition.isRequired()) {
        return template + '.isRequired';
      }

      return template;
    }
  }]);

  return ReactRenderer;
}(_Renderer3.default);

exports.default = ReactRenderer;