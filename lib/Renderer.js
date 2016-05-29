'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _Definition = require('./Definition');

var _Definition2 = _interopRequireDefault(_Definition);

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

var _Union = require('./definitions/Union');

var _Union2 = _interopRequireDefault(_Union);

var _indent = require('./helpers/indent');

var _indent2 = _interopRequireDefault(_indent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function () {
  function Renderer(schema) {
    _classCallCheck(this, Renderer);

    this.schema = schema;
  }

  /**
   * Format a list (or string) of items into an array respecting depth indentation.
   *
   * @param {String|Array} items
   * @param {Number} depth
   * @returns {String}
   */


  _createClass(Renderer, [{
    key: 'formatArray',
    value: function formatArray(items, depth) {
      if (Array.isArray(items)) {
        items = items.join('\n');
      }

      return '[\n' + items + '\n' + (0, _indent2.default)(depth) + ']';
    }

    /**
     * Format a list (or string) of properties into an object respecting depth indentation.
     *
     * @param {String|Array} props
     * @param {Number} depth
     * @returns {String}
     */

  }, {
    key: 'formatObject',
    value: function formatObject(props, depth) {
      if (Array.isArray(props)) {
        props = props.join('\n');
      }

      return '{\n' + props + '\n' + (0, _indent2.default)(depth) + '}';
    }

    /**
     * Format a primitive value to it's visual representation.
     *
     * @param {*} value
     * @param {String} [type]
     * @returns {String}
     */

  }, {
    key: 'formatValue',
    value: function formatValue(value, type) {
      type = type || (typeof value === 'undefined' ? 'undefined' : _typeof(value));

      switch (type) {
        case 'string':
          return '\'' + value + '\'';

        case 'function':
        case 'boolean':
          return '' + value;

        case 'number':
          return '' + parseFloat(value);

        default:
          throw new TypeError('Unknown type "' + type + '" passed to formatValue().');
      }
    }

    /**
     * Return the schema name to be used as the prop type or type alias name.
     *
     * @param {String} [format]
     * @returns {String}
     */

  }, {
    key: 'getSchemaName',
    value: function getSchemaName() {
      var format = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

      return (this.schema.name + format + _config2.default.schemaSuffix).replace(' ', '').trim();
    }

    /**
     * Render the current schema into a formatted output.
     */

  }, {
    key: 'render',
    value: function render() {
      throw new Error('Renderer not implemented.');
    }

    /**
     * Render a definition to it's visual representation.
     *
     * @param {Definition} definition
     * @param {Number} depth
     * @returns {String}
     */

  }, {
    key: 'renderAttribute',
    value: function renderAttribute(definition) {
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
      } else if (definition instanceof _Union2.default) {
        return this.renderUnion(definition, depth);
      }

      return null;
    }

    /**
     * Render an array of items by formatting each value and prepending an indentation.
     *
     * @param {*[]} items
     * @param {Number} depth
     * @param {String} [valueType]
     * @returns {Array}
     */

  }, {
    key: 'renderArrayItems',
    value: function renderArrayItems(items) {
      var _this = this;

      var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var valueType = arguments[2];

      return items.map(function (item) {
        return (0, _indent2.default)(depth) + _this.wrapItem(_this.renderOrFormat(item, depth, valueType));
      });
    }

    /**
     * Render a mapping of properties by formatting each value and prepending an indentation.
     *
     * @param {*[]} props
     * @param {Number} depth
     * @returns {Array}
     */

  }, {
    key: 'renderObjectProps',
    value: function renderObjectProps(props) {
      var _this2 = this;

      var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

      return props.map(function (prop) {
        return (0, _indent2.default)(depth) + _this2.wrapProperty(prop.attribute, _this2.renderOrFormat(prop, depth));
      });
    }

    /**
     * Either render a definition or format a value.
     *
     * @param {*|Definition} value
     * @param {Number} depth
     * @param {String} [valueType]
     * @returns {String}
     */

  }, {
    key: 'renderOrFormat',
    value: function renderOrFormat(value, depth, valueType) {
      return value instanceof _Definition2.default ? this.renderAttribute(value, depth) : this.formatValue(value, valueType);
    }

    /**
     * Render a name and optional arguments into an function representation.
     *
     * @param {String} name
     * @param {String} [args]
     * @returns {String}
     */

  }, {
    key: 'wrapFunction',
    value: function wrapFunction(name) {
      var args = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

      return name + '(' + args + ')';
    }

    /**
     * Render a value into an array item representation.
     *
     * @param {String} value
     * @returns {String}
     */

  }, {
    key: 'wrapItem',
    value: function wrapItem(value) {
      return value + ',';
    }

    /**
     * Render a key and value into an object property representation.
     *
     * @param {String} key
     * @param {String} value
     * @returns {String}
     */

  }, {
    key: 'wrapProperty',
    value: function wrapProperty(key, value) {
      return key + ': ' + value + ',';
    }
  }]);

  return Renderer;
}();

exports.default = Renderer;