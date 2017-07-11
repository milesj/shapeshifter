/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Config from 'optimal';
import Definition from '../Definition';

import type { ReferenceConfig } from '../types';

export default class ReferenceDefinition extends Definition {
  config: ReferenceConfig;

  validateConfig() {
    this.config = new Config(this.config, opt => ({
      export: opt.bool(true),
      nullable: opt.bool(),
      reference: opt.string().empty().xor('self'),
      relation: opt.string().empty(),
      self: opt.bool().xor('reference'),
      subset: opt.string().empty(),
      type: opt.string('reference'),
    }), {
      name: 'ReferenceDefinition',
      unknown: true,
    });
  }
}
