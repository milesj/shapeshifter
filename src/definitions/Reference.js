/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Definition from '../Definition';

import type { Options, ReferenceConfig } from '../types';

export default class ReferenceDefinition extends Definition {
  config: ReferenceConfig;

  /**
   * {@inheritDoc}
   */
  constructor(options: Options, attribute: string, config: Object) {
    super(options, attribute, {
      reference: '',
      self: false,
      export: true,
      ...config,
    });
  }

  /**
   * {@inheritDoc}
   */
  validateConfig() {
    super.validateConfig();

    const { reference, self, subset, export: doExport } = this.config;

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

    if (typeof doExport !== 'boolean') {
      throw new TypeError('Invalid type detected, "export" property must be a boolean.');
    }
  }
}
