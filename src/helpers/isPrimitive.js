/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import { PRIMITIVE_TYPES } from '../constants';
import normalizeType from './normalizeType';

/**
 * Verify that a value is a primitive type.
 *
 * @param {*} value
 * @returns {Boolean}
 */
export default function isPrimitive(value) {
  return (PRIMITIVE_TYPES.indexOf(normalizeType(value)) >= 0);
}
