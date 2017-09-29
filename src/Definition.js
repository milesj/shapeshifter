/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Config, { bool, string, shape, union } from 'optimal';
import normalizeType from './helpers/normalizeType';

import type { UnionBuilder } from 'optimal'; // eslint-disable-line
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
   * Create an option for our `valueType` type definition.
   */
  createValueType(): UnionBuilder {
    return union([
      string(),
      shape({
        type: string().required(),
      }),
    ]).required();
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
    const { name } = this.constructor;

    this.config = new Config(this.config, {
      nullable: bool(),
      type: string(normalizeType(name.toLowerCase())),
    }, {
      name: name || 'Definition',
      unknown: true,
    });
  }
}
