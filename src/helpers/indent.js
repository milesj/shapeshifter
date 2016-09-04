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
export default function indent(depth, character = '  ') {
  let response = '';

  while (depth > 0) {
    response += character;
    depth--;
  }

  return response;
}
