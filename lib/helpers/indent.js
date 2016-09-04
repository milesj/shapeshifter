'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = indent;
/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

/**
 * Create a string that represents indentation using the defined depth.
 *
 * @param {Number} depth
 * @param {String} character
 * @returns {String}
 */
function indent(depth) {
  var character = arguments.length <= 1 || arguments[1] === undefined ? '  ' : arguments[1];

  var response = '';

  while (depth > 0) {
    response += character;
    depth--;
  }

  return response;
}