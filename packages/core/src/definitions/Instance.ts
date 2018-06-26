/**
 * @copyright   2016-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import optimal, { bool, string } from 'optimal';
import Definition from '../Definition';
import { InstanceConfig } from '../types';

export default class InstanceDefinition extends Definition<InstanceConfig> {
  validateConfig() {
    this.config = optimal(
      this.config,
      {
        contract: string().required(),
        nullable: bool(),
        optional: bool(),
        type: string('instance'),
      },
      {
        name: 'InstanceDefinition',
        unknown: true,
      },
    );
  }
}
