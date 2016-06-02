/**
 * Return true if the value is a literal object.
 *
 * @param {*} value
 * @returns {Boolean}
 */
export default function isObject(value) {
  return (typeof value === 'object' && value !== null && !Array.isArray(value));
}
