/**
 * @copyright   2016-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import normalizeType from './normalizeType';

/**
 * Verify that a value is a primitive type.
 */
export default function isPrimitive(value: string | object): boolean {
  const type = normalizeType(value);

  return type === 'boolean' || type === 'number' || type === 'string' || type === 'key';
}
