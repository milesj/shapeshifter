/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import isObject from './isObject';

// Use a hash map for faster lookups
const ALIAS_MAP = {
  arr: 'array',
  binary: 'boolean',
  bool: 'boolean',
  float: 'number',
  inst: 'instance',
  int: 'number',
  integer: 'number',
  list: 'array',
  map: 'object',
  num: 'number',
  obj: 'object',
  ref: 'reference',
  str: 'string',
  struct: 'shape',
};

/**
 * Expand and return the valid type name for all aliases and shorthands.
 */
export default function normalizeType(baseType: *): string {
  let type = baseType;

  if (isObject(baseType)) {
    // $FlowIgnore
    ({ type } = baseType);
  }

  type = String(type).toLowerCase();

  return ALIAS_MAP[type] || type;
}
