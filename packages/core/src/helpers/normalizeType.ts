import isObject from './isObject';

// Use a hash map for faster lookups
const ALIAS_MAP: { [key: string]: string } = {
  arr: 'array',
  binary: 'boolean',
  bool: 'boolean',
  fk: 'key',
  float: 'number',
  inst: 'instance',
  int: 'number',
  integer: 'number',
  list: 'array',
  map: 'object',
  morph: 'polymorph',
  num: 'number',
  obj: 'object',
  pk: 'key',
  poly: 'polymorph',
  ref: 'reference',
  str: 'string',
  struct: 'shape',
};

/**
 * Expand and return the valid type name for all aliases and shorthands.
 */
export default function normalizeType(baseType: any): string {
  let type = baseType;

  if (isObject(baseType)) {
    ({ type } = baseType);
  }

  type = String(type).toLowerCase();

  return ALIAS_MAP[type] || type;
}
