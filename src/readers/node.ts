/**
 * @copyright   2016-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

/* eslint-disable */

import { SchemaStructure } from '../types';

export default function readWithNode(path: string): SchemaStructure {
  return require(path);
}
