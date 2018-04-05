/**
 * @copyright   2016-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import { Config } from '../types';

export default function toConfig(value: string | Config): Config {
  return typeof value === 'string' ? { type: value } : value;
}
