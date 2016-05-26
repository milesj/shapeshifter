import { PRIMITIVE_TYPES } from '../constants';

/**
 * Verify that a value is a primitive type.
 *
 * @param {*} value
 * @returns {Boolean}
 */
export default function isPrimitive(value) {
  return (PRIMITIVE_TYPES.indexOf(typeof value) >= 0);
}
