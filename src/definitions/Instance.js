/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Config from 'optimal';
import Definition from '../Definition';

import type { InstanceConfig } from '../types';

export default class InstanceDefinition extends Definition {
  config: InstanceConfig;

  validateConfig() {
    this.config = new Config(this.config, opt => ({
      contract: opt.string().required(),
      nullable: opt.bool(),
      type: opt.string('instance'),
    }), {
      name: 'InstanceDefinition',
      unknown: true,
    });
  }
}
