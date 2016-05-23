'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Compiler2 = require('../Compiler');

var _Compiler3 = _interopRequireDefault(_Compiler2);

var _indent = require('../helpers/indent');

var _indent2 = _interopRequireDefault(_indent);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlowCompiler = function (_Compiler) {
    _inherits(FlowCompiler, _Compiler);

    function FlowCompiler() {
        _classCallCheck(this, FlowCompiler);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(FlowCompiler).apply(this, arguments));
    }

    _createClass(FlowCompiler, [{
        key: 'compile',
        value: function compile() {
            var fields = this.compileFields();

            return 'type ' + (this.schema.name + _config2.default.schemaSuffix) + ' = {\n' + fields.join(';\n') + '\n};';
        }
    }, {
        key: 'renderBool',
        value: function renderBool(field, definition) {
            return this.wrapProperty(field, definition, 'boolean');
        }
    }, {
        key: 'renderFunc',
        value: function renderFunc(field, definition) {
            return this.wrapProperty(field, definition, 'func');
        }
    }, {
        key: 'renderNumber',
        value: function renderNumber(field, definition) {
            return this.wrapProperty(field, definition, 'number');
        }
    }, {
        key: 'renderString',
        value: function renderString(field, definition) {
            return this.wrapProperty(field, definition, 'string');
        }
    }, {
        key: 'wrapProperty',
        value: function wrapProperty(field, definition, template) {
            var depth = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

            return '' + (0, _indent2.default)(depth) + field + (definition.isNullable() ? '?' : '') + ': ' + template;
        }
    }]);

    return FlowCompiler;
}(_Compiler3.default);

exports.default = FlowCompiler;