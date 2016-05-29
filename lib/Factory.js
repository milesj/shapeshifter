'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var _Flow = require('./renderers/Flow');

var _Flow2 = _interopRequireDefault(_Flow);

var _React = require('./renderers/React');

var _React2 = _interopRequireDefault(_React);

var _TypeScript = require('./renderers/TypeScript');

var _TypeScript2 = _interopRequireDefault(_TypeScript);

var _isPrimitive = require('./helpers/isPrimitive');

var _isPrimitive2 = _interopRequireDefault(_isPrimitive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Factory = function () {
  function Factory() {
    _classCallCheck(this, Factory);
  }

  _createClass(Factory, null, [{
    key: 'definition',

    /**
     * Create a new definition based on the defined attribute configuration.
     *
     * @param {String} attribute
     * @param {Object} config
     * @returns {Definition}
     */
    value: function definition(attribute, config) {
      // Convert primitives to configuration objects
      if (typeof config === 'string') {
        if ((0, _isPrimitive2.default)(config)) {
          config = { type: config };
        } else {
          throw new TypeError('Invalid primitive type "' + config + '".');
        }
      }

      // Check if a type exists
      if (!config.type) {
        throw new SyntaxError('Definitions require a "type" property.');
      }

      // Instantiate definition classes
      switch (config.type) {
        case 'array':
          return new _Array2.default(attribute, config);

        case 'bool':
        case 'boolean':
          config.type = 'boolean';
          return new _Bool2.default(attribute, config);

        case 'enum':
          return new _Enum2.default(attribute, config);

        case 'func':
        case 'function':
          config.type = 'function';
          return new _Func2.default(attribute, config);

        case 'inst':
        case 'instance':
          config.type = 'instance';
          return new _Instance2.default(attribute, config);

        case 'int':
        case 'integer':
        case 'number':
          config.type = 'number';
          return new _Number2.default(attribute, config);

        case 'obj':
        case 'object':
          config.type = 'object';
          return new _Object2.default(attribute, config);

        case 'struct':
        case 'shape':
          config.type = 'shape';
          return new _Shape2.default(attribute, config);

        case 'str':
        case 'string':
          config.type = 'string';
          return new _String2.default(attribute, config);

        case 'union':
          return new _Union2.default(attribute, config);

        default:
          throw new TypeError('Type "' + (config.type || 'unknown') + '" not supported.');
      }
    }

    /**
     * Create a new renderer with the defined schema.
     *
     * @param {String} renderer
     * @param {Schema} schema
     * @returns {Renderer}
     */

  }, {
    key: 'renderer',
    value: function renderer(_renderer, schema) {
      switch (_renderer) {
        case 'react':
          return new _React2.default(schema);

        case 'flow':
          return new _Flow2.default(schema);

        case 'ts':
        case 'typescript':
          return new _TypeScript2.default(schema);

        default:
          throw new Error('Renderer "' + (_renderer || 'unknown') + '" not supported.');
      }
    }
  }]);

  return Factory;
}();

exports.default = Factory;