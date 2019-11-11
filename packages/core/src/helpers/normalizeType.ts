import isObject from './isObject';
import { Config } from '../types';

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
export default function normalizeType(baseType: unknown): string {
  let type = String(baseType);

  if (isObject<Config>(baseType)) {
    ({ type } = baseType);
  }

  type = String(type).toLowerCase();

  return ALIAS_MAP[type] || type;
}
