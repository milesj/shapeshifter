/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import { PRIMITIVE_TYPES } from '../constants';
import normalizeType from './normalizeType';

/**
 * Verify that a value is a primitive type.
 */
export default function isPrimitive(value: string): boolean {
  return (PRIMITIVE_TYPES.indexOf(normalizeType(value)) >= 0);
}
