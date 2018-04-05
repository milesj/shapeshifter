/**
 * @copyright   2016-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import optimal, { bool, string } from 'optimal';
import Definition from '../Definition';
import { ReferenceConfig } from '../types';

export default class ReferenceDefinition extends Definition<ReferenceConfig> {
  validateConfig() {
    this.config = optimal(
      this.config,
      {
        export: bool(true),
        nullable: bool(),
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
