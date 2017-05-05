/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import isObject from './isObject';

// Use a hash map for faster lookups
const ALIAS_MAP = {
  binary: 'boolean',
  bool: 'boolean',
  inst: 'instance',
  int: 'number',
  integer: 'number',
  num: 'number',
  float: 'number',
  obj: 'object',
  struct: 'shape',
  str: 'string',
  ref: 'reference',
  arr: 'array',
  list: 'array',
  map: 'object',
};

/**
 * Expand and return the valid type name for all aliases and shorthands.
 */
export default function normalizeType(baseType: mixed): string {
  let type = baseType;

  if (isObject(baseType)) {
    // $FlowIgnore We know its an object
    ({ type } = baseType);
  }

  type = String(type).toLowerCase();

  return ALIAS_MAP[type] || type;
}
