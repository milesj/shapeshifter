'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Compiler2 = require('../Compiler');

var _Compiler3 = _interopRequireDefault(_Compiler2);

var _indent = require('../helpers/indent');

var _indent2 = _interopRequireDefault(_indent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactCompiler = function (_Compiler) {
    _inherits(ReactCompiler, _Compiler);

    function ReactCompiler() {
        _classCallCheck(this, ReactCompiler);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ReactCompiler).apply(this, arguments));
    }

    _createClass(ReactCompiler, [{
        key: 'compile',
        value: function compile() {
            var _this2 = this;

            var fields = this.schema.fields.map(function (definition) {
                return _this2.wrapProperty(definition.field, _this2.compileField(definition));
            });

            return 'const ' + this.getResourceName() + ' = PropTypes.shape({\n' + fields.join('\n') + '\n});';
        }
    }, {
        key: 'renderArray',
        value: function renderArray(definition) {
            return this.wrapPropType(definition, this.wrapFunction('arrayOf', this.compileField(definition.valueType)));
        }
    }, {
        key: 'renderBool',
        value: function renderBool(definition) {
            return this.wrapPropType(definition, 'bool');
        }
    }, {
        key: 'renderEnum',
        value: function renderEnum(definition) {
            var _definition$config = definition.config;
            var values = _definition$config.values;
            var valueType = _definition$config.valueType;


            return this.wrapPropType(definition, this.wrapFunction('oneOf', this.formatArray(values, valueType)));
        }
    }, {
        key: 'renderFunc',
        value: function renderFunc(definition) {
            return this.wrapPropType(definition, 'func');
        }
    }, {
        key: 'renderInstance',
        value: function renderInstance(definition) {
            var contract = definition.config.contract;


            return this.wrapPropType(definition, this.wrapFunction('instanceOf', this.formatValue(contract, 'function')));
        }
    }, {
        key: 'renderNumber',
        value: function renderNumber(definition) {
            return this.wrapPropType(definition, 'number');
        }
    }, {
        key: 'renderString',
        value: function renderString(definition) {
            return this.wrapPropType(definition, 'string');
        }
    }, {
        key: 'wrapFunction',
        value: function wrapFunction(name) {
            var args = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

            return name + '(' + args + ')';
        }
    }, {
        key: 'wrapProperty',
        value: function wrapProperty(key, value) {
            var depth = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

            return '' + (0, _indent2.default)(depth) + key + ': ' + value + ',';
        }
    }, {
        key: 'wrapPropType',
        value: function wrapPropType(definition, template) {
            var response = 'PropTypes.' + template;

            if (definition.isRequired()) {
                response += '.isRequired';
            }

            return response;
        }
    }]);

    return ReactCompiler;
}(_Compiler3.default);

exports.default = ReactCompiler;