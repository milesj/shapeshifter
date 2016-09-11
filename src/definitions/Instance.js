/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Definition from '../Definition';

import type { InstanceConfig } from '../types';

export default class InstanceDefinition extends Definition {
  config: InstanceConfig;

  /**
   * {@inheritDoc}
   */
  validateConfig() {
    super.validateConfig();

    const { contract } = this.config;

    if (!contract) {
      throw new SyntaxError(
        'Instance definitions require a "contract" property, ' +
        'which is the function or class name to evaluate against.'
      );

    } else if (typeof contract !== 'string') {
      throw new TypeError('Invalid type detected, "contract" property must be a string.');
    }
  }
}
