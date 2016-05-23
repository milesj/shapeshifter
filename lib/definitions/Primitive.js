'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isPrimitive = require('../helpers/isPrimitive');

var _isPrimitive2 = _interopRequireDefault(_isPrimitive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Primitive = function () {
    function Primitive() {
        _classCallCheck(this, Primitive);
    }

    _createClass(Primitive, [{
        key: 'validateConfig',
        value: function validateConfig(config) {
            var typeOf = typeof config === 'undefined' ? 'undefined' : _typeof(config);

            if (typeOf === 'string') {
                return (0, _isPrimitive2.default)(config);
            } else if (typeOf === 'object') {}
        }
    }]);

    return Primitive;
}();

exports.default = Primitive;