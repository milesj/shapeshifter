/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Config, { bool, string } from 'optimal';
import Definition from '../Definition';

import type { ReferenceConfig } from '../types';

export default class ReferenceDefinition extends Definition {
  config: ReferenceConfig;

  validateConfig() {
    this.config = new Config(
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
