/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import type { Options } from './types';

export default class Definition {
  options: Options;
  attribute: string;
  config: Object;

  /**
   * Represents a type definition for an attribute.
   */
  constructor(options: Options, attribute: string, config: Object = {}) {
    this.options = options;
    this.attribute = attribute;
    this.config = {
      nullable: options.defaultNullable,
      ...config,
    };

    this.validateConfig();
  }

  /**
   * Returns true if the attribute allows nulls.
   */
  isNullable(): boolean {
    return this.config.nullable;
  }

  /**
   * Validate the definition configuration.
   */
  validateConfig() {
    const { config } = this;

    if (typeof config.nullable !== 'boolean') {
      throw new TypeError('Invalid type detected, "nullable" property must be a boolean.');
    }
  }
}
