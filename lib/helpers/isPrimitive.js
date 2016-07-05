'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isPrimitive;

var _constants = require('../constants');

var _normalizeType = require('./normalizeType');

var _normalizeType2 = _interopRequireDefault(_normalizeType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Verify that a value is a primitive type.
 *
 * @param {*} value
 * @returns {Boolean}
 */
/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

function isPrimitive(value) {
  return _constants.PRIMITIVE_TYPES.indexOf((0, _normalizeType2.default)(value)) >= 0;
}