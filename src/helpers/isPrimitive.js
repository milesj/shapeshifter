/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import normalizeType from './normalizeType';

/**
 * Verify that a value is a primitive type.
 */
export default function isPrimitive(value: string): boolean {
  const type = normalizeType(value);

  return (type === 'boolean' || type === 'number' || type === 'string');
}
