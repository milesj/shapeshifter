/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Definition from '../Definition';

export default class InstanceDefinition extends Definition {
  /**
   * {@inheritDoc}
   */
  validateConfig(): void {
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
