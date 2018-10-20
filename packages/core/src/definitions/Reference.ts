/**
 * @copyright   2016-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import optimal, { bool, string } from 'optimal';
import Definition from '../Definition';
import { Options, ReferenceConfig } from '../types';

export default class ReferenceDefinition extends Definition<ReferenceConfig> {
  constructor(options: Options, attribute: string, config: Partial<ReferenceConfig> = {}) {
    super(options, attribute, config, false);

    this.config = optimal(
      this.config,
      {
        export: bool(true),
        nullable: bool(),
        optional: bool(),
        reference: string()
          .empty()
          .xor('self'),
        relation: string().empty(),
        self: bool().xor('reference'),
        subset: string().empty(),
        type: string('reference'),
      },
      {
        name: 'ReferenceDefinition',
        unknown: true,
      },
    );
  }
}
