/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Config, { bool, string } from 'optimal';
import Definition from '../Definition';

import type { InstanceConfig } from '../types';

export default class InstanceDefinition extends Definition {
  config: InstanceConfig;

  validateConfig() {
    this.config = new Config(this.config, {
      contract: string().required(),
      nullable: bool(),
      type: string('instance'),
    }, {
      name: 'InstanceDefinition',
      unknown: true,
    });
  }
}
