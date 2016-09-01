'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright   2016, Miles Johnson
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license     https://opensource.org/licenses/MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _Factory = require('./Factory');

var _Factory2 = _interopRequireDefault(_Factory);

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

var _Reference = require('./definitions/Reference');

var _Reference2 = _interopRequireDefault(_Reference);

var _Shape = require('./definitions/Shape');

var _Shape2 = _interopRequireDefault(_Shape);

var _String = require('./definitions/String');

var _String2 = _interopRequireDefault(_String);

var _Union = require('./definitions/Union');

var _Union2 = _interopRequireDefault(_Union);

var _indent = require('./helpers/indent');

var _indent2 = _interopRequireDefault(_indent);

var _formatName = require('./helpers/formatName');

var _formatName2 = _interopRequireDefault(_formatName);

var _normalizeType = require('./helpers/normalizeType');

var _normalizeType2 = _interopRequireDefault(_normalizeType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function () {
  function Renderer(schema) {
    _classCallCheck(this, Renderer);

    this.schema = schema;
    this.imports = [];
    this.constants = [];
    this.header = [];
    this.sets = [];
    this.referencePaths = [];
  }

  /**
   * Triggered after parsing finished.
   */


  _createClass(Renderer, [{
    key: 'afterParse',
    value: function afterParse() {}

    /**
     * Triggered before parsing begins.
     */

  }, {
    key: 'beforeParse',
    value: function beforeParse() {}

    /**
     * Format a list (or string) of items into an array respecting depth indentation.
     *
     * @param {String|Array} items
     * @param {Number} depth
     * @param {String} itemSpacer
     * @param {String} indentSpacer
     * @returns {String}
     */

  }, {
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
      return this.constants;
    }

    /**
     * Return a header template to place at the top of the file after constants.
     *
     * @returns {String[]}
     */

  }, {
    key: 'getHeader',
    value: function getHeader() {
      return this.header;
    }

    /**
     * Return a rendered list of imports to place at the top of the file.
     *
     * @returns {String[]}
     */

  }, {
    key: 'getImports',
    value: function getImports() {
      return this.imports;
    }

    /**
     * Return a list of all relative reference paths.
     *
     * @returns {String[]}
     */

  }, {
    key: 'getReferences',
    value: function getReferences() {
      return this.referencePaths;
    }

    /**
     * Return the schema name to be used as the prop type or type alias name.
     *
     * @param {String} [setName]
     * @param {String} [schemaName]
     * @returns {String}
     */

  }, {
    key: 'getSchemaName',
    value: function getSchemaName() {
      var setName = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
      var schemaName = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
      var suffix = arguments.length <= 2 || arguments[2] === undefined ? 'Schema' : arguments[2];

      return [schemaName || this.schema.name, setName, suffix].map(_formatName2.default).join('');
    }

    /**
     * Return a list of the primary set and all subsets.
     *
     * @returns {String[]}
     */

  }, {
    key: 'getSets',
    value: function getSets() {
      return this.sets;
    }

    /**
     * Parse and render all information defined in the schema.
     */

  }, {
    key: 'parse',
    value: function parse() {
      this.beforeParse();
      this.parseImports();
      this.parseConstants();
      this.parseSets();
      this.parseReferences();
      this.afterParse();
    }

    /**
     * Parse all constants out of the schema and append to the renderer.
     */

  }, {
    key: 'parseConstants',
    value: function parseConstants() {
      var _this = this;

      var constants = this.schema.constants;


      Object.keys(constants).forEach(function (key) {
        _this.constants.push(_this.renderConstant(key, constants[key]));
      });
    }

    /**
     * Parse all imports out of the schema and append to the renderer.
     */

  }, {
    key: 'parseImports',
    value: function parseImports() {
      var _this2 = this;

      this.schema.imports.forEach(function (importStatement) {
        _this2.imports.push(_this2.renderImport(importStatement));
      });
    }

    /**
     * Parse out all reference paths.
     */

  }, {
    key: 'parseReferences',
    value: function parseReferences() {
      var _this3 = this;

      Object.keys(this.schema.references).forEach(function (key) {
        _this3.referencePaths.push(_this3.schema.references[key]);
      });
    }

    /**
     * Parse all subsets out of the schema and append to the renderer.
     */

  }, {
    key: 'parseSets',
    value: function parseSets() {
      var _this4 = this;

      var baseAttributes = this.schema.schema.attributes;
      var _schema = this.schema;
      var attributes = _schema.attributes;
      var subsets = _schema.subsets;

      // Subsets

      Object.keys(subsets).forEach(function (setName) {
        var setAttributes = [];
        var subset = subsets[setName];

        if (Array.isArray(subset)) {
          subset = { attributes: subset };
        }

        var nullable = subset.null || {};
        var required = subset.required || {};

        subset.attributes.forEach(function (attribute) {
          var setConfig = baseAttributes[attribute];

          if (!setConfig) {
            throw new SyntaxError('Attribute ' + attribute + ' does not exist in the base schema.');
          }

          if (typeof setConfig === 'string') {
            setConfig = { type: setConfig };
          } else {
            setConfig = _extends({}, setConfig); // Dereference original object
          }

          if (attribute in nullable) {
            setConfig.null = nullable[attribute];
          }

          if (attribute in required) {
            setConfig.required = required[attribute];
          }

          setAttributes.push(_Factory2.default.definition(attribute, setConfig));
        });

        _this4.sets.push(_this4.render(setName, setAttributes));
      });

      // Default set
      this.sets.push(this.render('', attributes));
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
      } else if (definition instanceof _Reference2.default) {
        return this.renderReference(definition, depth);
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
     * Render an array definition.
     */

  }, {
    key: 'renderArray',
    value: function renderArray() {
      this.unsupported('array');
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
      var _this5 = this;

      var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var valueType = arguments[2];

      return items.map(function (item) {
        return _this5.wrapItem(_this5.renderOrFormat(item, depth, valueType), depth);
      });
    }

    /**
     * Render a boolean definition.
     */

  }, {
    key: 'renderBool',
    value: function renderBool() {
      this.unsupported('boolean');
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
      var _this6 = this;

      if (Array.isArray(value)) {
        value = this.formatArray(value.map(function (v) {
          return _this6.formatValue(v);
        }), 0, ', ', '');
      } else {
        value = this.formatValue(value);
      }

      return 'export const ' + name + ' = ' + value + ';';
    }

    /**
     * Render an enum definition.
     */

  }, {
    key: 'renderEnum',
    value: function renderEnum() {
      this.unsupported('enum');
    }

    /**
     * Render a function definition.
     */

  }, {
    key: 'renderFunc',
    value: function renderFunc() {
      this.unsupported('function');
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
     * Render an instance definition.
     */

  }, {
    key: 'renderInstance',
    value: function renderInstance() {
      this.unsupported('instance');
    }

    /**
     * Render a number definition.
     */

  }, {
    key: 'renderNumber',
    value: function renderNumber() {
      this.unsupported('number');
    }

    /**
     * Render an object definition.
     */

  }, {
    key: 'renderObject',
    value: function renderObject() {
      this.unsupported('object');
    }

    /**
     * Render a mapping of properties by formatting each value and prepending an indentation.
     *
     * @param {Definition[]} props
     * @param {Number} depth
     * @param {String} sep
     * @returns {Array}
     */

  }, {
    key: 'renderObjectProps',
    value: function renderObjectProps(props) {
      var _this7 = this;

      var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var sep = arguments.length <= 2 || arguments[2] === undefined ? ',' : arguments[2];

      return props.map(function (prop) {
        return _this7.wrapProperty(_this7.wrapPropertyName(prop), _this7.renderAttribute(prop, depth), depth, sep);
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
     * Render a reference definition.
     *
     * @param {Definition} definition
     * @returns {String}
     */

  }, {
    key: 'renderReference',
    value: function renderReference(definition) {
      var _definition$config = definition.config;
      var reference = _definition$config.reference;
      var self = _definition$config.self;
      var subset = _definition$config.subset;

      var refSchema = self ? this.schema : this.schema.referenceSchemas[reference];

      if (!refSchema) {
        throw new SyntaxError('The reference "' + reference + '" does not exist in the "' + this.schema.name + '" schema.');
      }

      if (subset && !refSchema.subsets[subset]) {
        throw new SyntaxError('The reference "' + reference + '" does not contain a subset named "' + subset + '".');
      }

      return this.getSchemaName(subset, refSchema.name);
    }

    /**
     * Render a shape definition.
     */

  }, {
    key: 'renderShape',
    value: function renderShape() {
      this.unsupported('shape');
    }

    /**
     * Render a union definition.
     */

  }, {
    key: 'renderUnion',
    value: function renderUnion() {
      this.unsupported('union');
    }

    /**
     * Render a string definition.
     */

  }, {
    key: 'renderString',
    value: function renderString() {
      this.unsupported('string');
    }

    /**
     * Throws an error if a definition is not supported.
     *
     * @param {String} definition
     */

  }, {
    key: 'unsupported',
    value: function unsupported(definition) {
      throw new Error('The "' + definition + '" definition is not supported by ' + this.constructor.name + '.');
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
     * Render a generics alias with optional type arguments.
     *
     * @param {String} alias
     * @param {String[]} types
     * @returns {String}
       */

  }, {
    key: 'wrapGenerics',
    value: function wrapGenerics(alias) {
      for (var _len = arguments.length, types = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        types[_key - 1] = arguments[_key];
      }

      return alias + '<' + types.join(', ') + '>';
    }

    /**
     * Return a piece of code wrapped in an IIFE.
     *
     * @param {String} code
     * @returns {String}
     */

  }, {
    key: 'wrapIIFE',
    value: function wrapIIFE(code) {
      return '(function () { return ' + code + '; }())';
    }

    /**
     * Render a value into an array item representation.
     *
     * @param {String} value
     * @param {Number} depth
     * @returns {String}
     */

  }, {
    key: 'wrapItem',
    value: function wrapItem(value) {
      var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

      return '' + (0, _indent2.default)(depth) + value + ',';
    }

    /**
     * Render a key and value into an object property representation.
     *
     * @param {String} key
     * @param {String} value
     * @param {Number} depth
     * @param {String} sep
     * @returns {String}
     */

  }, {
    key: 'wrapProperty',
    value: function wrapProperty(key, value) {
      var depth = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
      var sep = arguments.length <= 3 || arguments[3] === undefined ? ',' : arguments[3];

      return '' + (0, _indent2.default)(depth) + key + ': ' + value + (sep || ',');
    }

    /**
     * Return the property name as is.
     *
     * @param {Definition} definition
     * @returns {String}
     */

  }, {
    key: 'wrapPropertyName',
    value: function wrapPropertyName(definition) {
      return definition.attribute;
    }
  }]);

  return Renderer;
}();

exports.default = Renderer;