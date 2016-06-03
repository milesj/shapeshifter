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

var _normalizeType = require('./helpers/normalizeType');

var _normalizeType2 = _interopRequireDefault(_normalizeType);

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
   * @param {String} itemSpacer
   * @param {String} indentSpacer
   * @returns {String}
   */


  _createClass(Renderer, [{
    key: 'formatArray',
    value: function formatArray(items, depth) {
      var itemSpacer = arguments.length <= 2 || arguments[2] === undefined ? '\n' : arguments[2];
      var indentSpacer = arguments.length <= 3 || arguments[3] === undefined ? '\n' : arguments[3];

      if (Array.isArray(items)) {
        items = items.join(itemSpacer);
      }

      return '[' + indentSpacer + items + indentSpacer + (0, _indent2.default)(depth) + ']';
    }

    /**
     * Format a list (or string) of properties into an object respecting depth indentation.
     *
     * @param {String|Array} props
     * @param {Number} depth
     * @param {String} propSpacer
     * @param {String} indentSpacer
     * @returns {String}
     */

  }, {
    key: 'formatObject',
    value: function formatObject(props, depth) {
      var propSpacer = arguments.length <= 2 || arguments[2] === undefined ? '\n' : arguments[2];
      var indentSpacer = arguments.length <= 3 || arguments[3] === undefined ? '\n' : arguments[3];

      if (Array.isArray(props)) {
        props = props.join(propSpacer);
      }

      return '{' + indentSpacer + props + indentSpacer + (0, _indent2.default)(depth) + '}';
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
      if (value === null) {
        return 'null';
      }

      type = (0, _normalizeType2.default)(type || (typeof value === 'undefined' ? 'undefined' : _typeof(value)));

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
     * Return a rendered list of constants to place at the top of the file.
     *
     * @returns {String[]}
     */

  }, {
    key: 'getConstants',
    value: function getConstants() {
      var _this = this;

      var constants = this.schema.constants;

      var response = [];

      Object.keys(constants).forEach(function (key) {
        response.push(_this.renderConstant(key, constants[key]));
      });

      return response;
    }

    /**
     * Return a header template to place at the top of the file.
     *
     * @returns {String}
     */

  }, {
    key: 'getHeader',
    value: function getHeader() {
      return '';
    }

    /**
     * Return a rendered list of imports to place at the top of the file.
     *
     * @returns {String[]}
     */

  }, {
    key: 'getImports',
    value: function getImports() {
      var _this2 = this;

      var response = [];

      this.schema.imports.forEach(function (importStatement) {
        response.push(_this2.renderImport(importStatement));
      });

      return response;
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

      return [this.schema.name, format, _config2.default.schemaSuffix].map(function (value) {
        if (!value) {
          return '';
        }

        value = value.replace(/[^a-zA-Z0-9]+/g, ' ').replace(/\W+(.)/g, function (match) {
          return match[1].toUpperCase();
        }).trim();

        return value.charAt(0).toUpperCase() + value.slice(1);
      }).join('');
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
      var _this3 = this;

      var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var valueType = arguments[2];

      return items.map(function (item) {
        return (0, _indent2.default)(depth) + _this3.wrapItem(_this3.renderOrFormat(item, depth, valueType));
      });
    }

    /**
     * Render a constant.
     *
     * @param {String} name
     * @param {*} value
     * @returns {String}
     */

  }, {
    key: 'renderConstant',
    value: function renderConstant(name, value) {
      var _this4 = this;

      if (Array.isArray(value)) {
        value = this.formatArray(value.map(function (v) {
          return _this4.formatValue(v);
        }), 0, ', ', '');
      } else {
        value = this.formatValue(value);
      }

      return 'export const ' + name + ' = ' + value + ';';
    }

    /**
     * Render an import statement.
     *
     * @param {String} defaultName
     * @param {String[]} named
     * @param {String} path
     * @returns {String}
     */

  }, {
    key: 'renderImport',
    value: function renderImport(_ref) {
      var defaultName = _ref.default;
      var _ref$named = _ref.named;
      var named = _ref$named === undefined ? [] : _ref$named;
      var path = _ref.path;

      if (!path) {
        throw new SyntaxError('Import statements require a file path.');
      } else if (!Array.isArray(named)) {
        throw new TypeError('Named imports must be an array.');
      }

      var imports = [];

      if (defaultName) {
        imports.push(defaultName);
      }

      if (named.length) {
        imports.push(this.formatObject(named, 0, ', ', ' '));
      }

      if (!imports.length) {
        throw new Error('Import statements require either a default export or named exports.');
      }

      return 'import ' + imports.join(', ') + ' from \'' + path + '\';';
    }

    /**
     * Render a mapping of properties by formatting each value and prepending an indentation.
     *
     * @param {Definition[]} props
     * @param {Number} depth
     * @returns {Array}
     */

  }, {
    key: 'renderObjectProps',
    value: function renderObjectProps(props) {
      var _this5 = this;

      var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

      return props.map(function (prop) {
        return (0, _indent2.default)(depth) + _this5.wrapProperty(prop.attribute, _this5.renderAttribute(prop, depth));
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