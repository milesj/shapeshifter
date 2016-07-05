'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = indent;

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a string that represents indentation using the defined depth.
 *
 * @param {Number} depth
 * @returns {String}
 */
function indent(depth) {
  var response = '';

  while (depth > 0) {
    response += _config2.default.indentCharacter;
    depth--;
  }

  return response;
} /**
   * @copyright   2016, Miles Johnson
   * @license     https://opensource.org/licenses/MIT
   */