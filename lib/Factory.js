'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Array = require('../lib/definitions/Array');

var _Array2 = _interopRequireDefault(_Array);

var _Bool = require('../lib/definitions/Bool');

var _Bool2 = _interopRequireDefault(_Bool);

var _Enum = require('../lib/definitions/Enum');

var _Enum2 = _interopRequireDefault(_Enum);

var _Func = require('../lib/definitions/Func');

var _Func2 = _interopRequireDefault(_Func);

var _Instance = require('../lib/definitions/Instance');

var _Instance2 = _interopRequireDefault(_Instance);

var _Number = require('../lib/definitions/Number');

var _Number2 = _interopRequireDefault(_Number);

var _Object = require('../lib/definitions/Object');

var _Object2 = _interopRequireDefault(_Object);

var _Shape = require('../lib/definitions/Shape');

var _Shape2 = _interopRequireDefault(_Shape);

var _String = require('../lib/definitions/String');

var _String2 = _interopRequireDefault(_String);

var _isPrimitive = require('../lib/helpers/isPrimitive');

var _isPrimitive2 = _interopRequireDefault(_isPrimitive);

var _isSupported = require('../lib/helpers/isSupported');

var _isSupported2 = _interopRequireDefault(_isSupported);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Factory = function () {
    function Factory() {
        _classCallCheck(this, Factory);
    }

    _createClass(Factory, null, [{
        key: 'definition',
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
            if (!config.type || !(0, _isSupported2.default)(config.type)) {
                throw new TypeError('Type "' + (config.type || 'unknown') + '" not supported.');
            }

            // Instantiate definition classes
            switch (config.type) {
                case 'array':
                    return new _Array2.default(attribute, config);
                case 'boolean':
                    return new _Bool2.default(attribute, config);
                case 'enum':
                    return new _Enum2.default(attribute, config);
                case 'function':
                    return new _Func2.default(attribute, config);
                case 'instance':
                    return new _Instance2.default(attribute, config);
                case 'number':
                    return new _Number2.default(attribute, config);
                case 'object':
                    return new _Object2.default(attribute, config);
                case 'shape':
                    return new _Shape2.default(attribute, config);
                case 'string':
                    return new _String2.default(attribute, config);
            }
        }
    }]);

    return Factory;
}();

exports.default = Factory;