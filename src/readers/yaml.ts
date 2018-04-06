/**
 * @copyright   2016-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import fs from 'fs';
import { basename } from 'path';
import yaml from 'js-yaml';
import { SchemaStructure } from '../types';

export default function readWithYaml(path: string): SchemaStructure {
  return yaml.safeLoad(fs.readFileSync(path, 'utf8'), {
    filename: basename(path),
    json: true,
  }) as SchemaStructure;
}
