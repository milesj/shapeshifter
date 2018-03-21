/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import parseOptions, { bool, string } from 'optimal';
import Definition from '../Definition';
import { InstanceConfig } from '../types';

export default class InstanceDefinition extends Definition<InstanceConfig> {
  validateConfig() {
    this.config = parseOptions(
      this.config,
      {
        contract: string().required(),
        nullable: bool(),
        type: string('instance'),
      },
      {
        name: 'InstanceDefinition',
        unknown: true,
      },
    );
  }
}
