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

    const { reference, self, subset } = this.config;

    if (!reference && !self) {
      throw new SyntaxError(
        'Reference definitions require a "reference" property, ' +
        'which points to an external schema to use, ' +
        'or a "self" property, which uses the current schema.'
      );

    } else if (reference && typeof reference !== 'string') {
      throw new TypeError('Invalid type detected, "reference" property must be a string.');

    } else if (self && typeof self !== 'boolean') {
      throw new TypeError('Invalid type detected, "self" property must be a boolean.');
    }

    if (subset && typeof subset !== 'string') {
      throw new TypeError('Invalid type detected, "subset" property must be a string.');
    }
  }
}
