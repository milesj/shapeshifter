'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = enumerable;

var _constants = require('../constants');

var _isPrimitive = require('../helpers/isPrimitive');

var _isPrimitive2 = _interopRequireDefault(_isPrimitive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function enumerable(type) {
    var values = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

    if (!(0, _isPrimitive2.default)(type)) {
        throw new TypeError('Enumerable type must be a primitive: bool, func, number, string, instance.');
    } else if (!Array.isArray(values)) {
        throw new TypeError('Enumerable values must be an array.');
    } else if (!values.every(function (value) {
        return type.validate(value);
    })) {
        throw new TypeError('Enumerable values do not match the defined type.');
    }

    return {
        definition: 'enum',
        dataType: _constants.TYPE_COMPOSITE,
        type: type,
        values: values,
        validate: function validate(value) {
            return type.validate(value) && values.indexOf(value) >= 0;
        }
    };
}