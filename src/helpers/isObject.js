/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

/**
 * Return true if the value is a literal object.
 *
 * @param {*} value
 * @returns {Boolean}
 */
export default function isObject(value) {
  return (typeof value === 'object' && value !== null && !Array.isArray(value));
}
