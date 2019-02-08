/**
 * @copyright   2016-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import optimal, { bool, string } from 'optimal';
import Definition from '../Definition';
import { Options, InstanceConfig } from '../types';

export default class InstanceDefinition extends Definition<InstanceConfig> {
  constructor(options: Options, attribute: string, config: Partial<InstanceConfig> = {}) {
    super(options, attribute, config, false);

    this.config = optimal(
      this.config,
      {
        contract: string()
          .required()
          .notEmpty(),
        nullable: bool(),
        optional: bool(),
        type: string('instance').notEmpty(),
      },
      {
        name: 'InstanceDefinition',
        unknown: true,
      },
    );
  }
}
