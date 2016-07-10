/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import Definition from '../Definition';

export default class ReferenceDefinition extends Definition {
  /**
   * {@inheritDoc}
   */
  validateConfig() {
    super.validateConfig();

    const { reference } = this.config;

    if (!reference) {
      throw new SyntaxError(
        'Reference definitions require a "reference" property, ' +
        'which points to an external schema to use.'
      );

    } else if (typeof reference !== 'string') {
      throw new TypeError('Invalid type detected, "reference" property must be a string.');
    }
  }
}
