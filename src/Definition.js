/**
 * @copyright   2016, Miles Johnson
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
   *
   * @param {Object} options
   * @param {String} attribute
   * @param {Object} config
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
   *
   * @returns {Boolean}
   */
  isNullable(): boolean {
    return this.config.nullable;
  }

  /**
   * Validate the definition configuration.
   */
  validateConfig() {
    const config = this.config;

    if (typeof config.nullable !== 'boolean') {
      throw new TypeError('Invalid type detected, "nullable" property must be a boolean.');
    }
  }
}
