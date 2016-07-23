'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatName;
/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

/**
 * Format a name by converting to pascal case.
 *
 * @param {String} value
 * @returns {String}
 */
function formatName(value) {
  if (!value) {
    return '';
  }

  value = value.replace(/[^a-zA-Z0-9]+/g, ' ').replace(/\W+(.)/g, function (match) {
    return match[1].toUpperCase();
  }).trim();

  return value.charAt(0).toUpperCase() + value.slice(1);
}