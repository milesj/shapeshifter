/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

/* eslint-disable */

import type { SchemaStructure } from '../types';

export default function readWithNode(path: string): SchemaStructure {
  // $FlowIssue Ignore
  return require(path);
}
