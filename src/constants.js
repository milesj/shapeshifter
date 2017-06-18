/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import type { Options } from './types';

export const PRIMITIVE_TYPES: string[] = ['boolean', 'number', 'string'];

export const COMPOUND_TYPES: string[] = [
  'array', 'enum', 'instance', 'object',
  'shape', 'union', 'reference',
];

export const TYPES: string[] = PRIMITIVE_TYPES.concat(COMPOUND_TYPES);

export const DEFAULT_OPTIONS: Options = {
  defaultNullable: false,
  includeSchemas: false,
  includeAttributes: false,
  includeTypes: false,
  indentCharacter: '  ',
  renderer: 'react',
  stripPropTypes: false,
  useDefine: false,
};
