/**
 * @copyright   2016-2019, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { SchemaStructure } from 'shapeshifter';

export default function parseYAML(filePath: string): SchemaStructure {
  return yaml.safeLoad(fs.readFileSync(filePath, 'utf8'), {
    filename: path.basename(filePath),
    json: true,
  }) as SchemaStructure;
}
